const pool = require("../../config/db")

const booking_resolver = {
  Query: {
    getBookingByCustomerAndWorker: async (_, { customer_id, worker_id }) => {
        const result = await pool.query(
          `SELECT * FROM bookings 
           WHERE customer_id = $1 AND worker_id = $2 AND (status = 'pending' or status = 'accepted')
           LIMIT 1`,
          [customer_id, worker_id]
        );

        if (result.rows.length > 0) {
          return result.rows[0];
        }

        return null;
    },
    
    getBookingsByCustomer: async (_, { customer_id }) => {
      const result = await pool.query(`
        SELECT 
          b.id, b.job_description, b.scheduled_time, b.status, 
          w.id AS worker_id, w.name AS worker_name, w.profession
        FROM bookings b
        JOIN workers w ON b.worker_id = w.id
        WHERE b.customer_id = $1
      `, [customer_id]);

      return result.rows.map(row => ({
        id: row.id,
        job_description: row.job_description,
        scheduled_time: row.scheduled_time,
        status: row.status,
        worker: {
          id: row.worker_id,
          name: row.worker_name,
          profession: row.profession
        }
      }));
    },


    // for Worker


    getBookingsByWorker: async (_, { worker_id }) => {
      const result = await pool.query(`
        SELECT 
          id, customer_id, worker_id, status, 
          job_description, scheduled_time, 
          completed_time, payment_status, 
          created_at
          FROM bookings
          WHERE worker_id = $1
          ORDER BY scheduled_time DESC
      `, [worker_id]);
    
      // return result.rows.map(row => ({
      //   id: row.id,
      //   customer_id: row.customer_id,
      //   worker_id: row.worker_id,
      //   status: row.status,
      //   job_description: row.job_description,
      //   scheduled_time: row.scheduled_time,
      //   completed_time: row.completed_time,
      //   payment_status: row.payment_status,
      //   created_at: row.created_at
      // }));

      return result.rows;
    }
    
  },

  Mutation: {
    createBooking: async (_, { customer_id, worker_id, job_description, scheduled_time }) => {
      const query = `
        INSERT INTO bookings (
          customer_id, worker_id, status, job_description, scheduled_time, payment_status
        ) VALUES (
          $1, $2, 'pending', $3, $4, 'pending'
        ) RETURNING *;
      `;

      const values = [customer_id, worker_id, job_description, scheduled_time];
      const { rows } = await pool.query(query, values);
      return rows[0];
    },


      // for Worker
      

      updateBookingStatus: async (_, { id, status }) => {
        let query = "";
        let values = [];
  
        if (status === "completed") {
          query = `
            UPDATE bookings
            SET status = $1, completed_time = NOW(), payment_status = 'paid'
            WHERE id = $2
            RETURNING *;
          `;
          values = [status, id];
        } else {
          query = `
            UPDATE bookings
            SET status = $1
            WHERE id = $2
            RETURNING *;
          `;
          values = [status, id];
        }
  
        const { rows } = await pool.query(query, values);
        return rows[0];
      }
  }
}

module.exports = booking_resolver