const pool = require("../../config/db")

const review_resolvers = {
    Query: {
        reviews: async () => {
            const { rows } = await pool.query("SELECT * FROM reviews");
            return rows
        },

        reviewsByWorker: async (_, { worker_id }) => {
            const { rows } = await pool.query(`
              SELECT 
                id,
                customer_id,
                worker_id,
                rating,
                comment,
                created_at
              FROM reviews
              WHERE worker_id = $1
            `, [worker_id]);
      
            return rows;
          }
    },

    Mutation: {
            addReview: async (_, { customer_id, worker_id, rating, comment }) => {
              try {
                const newReview = await pool.query(
                  `INSERT INTO reviews (customer_id, worker_id, rating, comment) 
                   VALUES ($1, $2, $3, $4) 
                   RETURNING *`,
                  [customer_id, worker_id, rating, comment]
                );
        
                return newReview.rows[0];
              } catch (error) {
                console.error("Failed to add review:", error);
                throw new Error("Failed to add review");
              }
            },
  
    }
}

module.exports = review_resolvers