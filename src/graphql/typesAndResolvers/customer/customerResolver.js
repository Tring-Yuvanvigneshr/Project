const pool = require("../../../config/db");

const customer_resolvers = {
  Query: {
    customers: async () => {
      const { rows } = await pool.query(`
        SELECT *
        FROM customers
      `);
      return rows;
    },

    getCustomerDetails: async (_, { userId }) => {
      const { rows } = await pool.query(
        `SELECT id, user_id, name, phone, address, city,
         location
         FROM customers WHERE id = $1`,
        [userId]
      );

      return rows[0];
    },

    getCustomerDetailsByUserid: async (_, { userId }) => {    //  for login purpose
      const { rows } = await pool.query(
        `SELECT id, user_id, name, phone, address, city,
         location
         FROM customers WHERE user_id = $1`,
        [userId]
      );

      return rows[0];
    },
  },

  

  Mutation: {
    createCustomer: async (_, { userId, name, phone, address, city, latitude, longitude }) => {
      const { rows } = await pool.query(
        `INSERT INTO customers (user_id, name, phone, address, city, location) 
         VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_MakePoint($7, $6), 4326))
         RETURNING *`,
        [userId, name, phone, address, city, latitude, longitude]
      );
      return rows[0];
    },

    updateCustomerDetails: async (_, { userId, name, phone, address, city, latitude, longitude }) => {
      const result = await pool.query(
        `UPDATE customers 
         SET 
           name = $1,
           phone = $2,
           address = $3,
           city = $4,
           location = ST_SetSRID(ST_MakePoint($6, $5), 4326),
           updated_at = NOW()
         WHERE user_id = $7
         RETURNING *`,
        [name, phone, address, city, latitude, longitude, userId]
      );      

      if (result.rows.length === 0) {
        throw new Error("Customer not found");
      }

      return result.rows[0];
    },

  },
};

module.exports = customer_resolvers;
