const pool = require("../../config/db");
const { hashPassword, verifyPassword, generateToken } = require("../../auth/auth");

const userresolvers = {
  Query: {
    users: async () => {
      const { rows } = await pool.query("SELECT id, name, email, role, created_at FROM users");
      return rows;
    },
  },

  Mutation: {
    registerUser: async (_, { email, password, role }) => {
      const hashedPassword = await hashPassword(password);

      const result = await pool.query(
        "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at",
        [email, hashedPassword, role]
      );

      const user = result.rows[0];

      return user;
    },

    signIn: async (_, { email, password }) => {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (result.rows.length === 0) {
        throw new Error("User not found");
      }

      const user = result.rows[0];

      const isMatch = await verifyPassword(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken(user);

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.created_at,
        },
      };
    },
  },
};

module.exports = userresolvers;
