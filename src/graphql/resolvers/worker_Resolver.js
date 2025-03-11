const pool = require("../../config/db");

const worker_resolvers = {
  Query: {
    workers: async () => {
      const { rows } = await pool.query(`
        SELECT 
          id, 
          phone, 
          profession, 
          experience, 
          location, 
          is_available, 
          available_from, 
          available_to, 
          created_at, 
          name
          FROM workers 
      `);
      return rows;
    },

    worker: async (_, { id }) => {
      const { rows } = await pool.query(`
        SELECT 
          id, 
          name, 
          phone,
          location,
          profession, 
          experience, 
          is_available, 
          available_from, 
          available_to
        FROM workers
        WHERE id = $1
      `, [id]);

      return rows[0];
    },


    getNearbyWorkers: async (_, { userId }) => {
      const query = `
        SELECT 
            w.id AS worker_id,
            w.name,
            w.address,
            w.phone,
            w.profession,
            w.experience,
            w.is_available,
            w.city,
            w.aadhar,
            w.available_from,
            w.available_to,
            ST_Distance(c.location, w.location) AS distance
        FROM 
            customers c
        JOIN 
            workers w ON c.location IS NOT NULL
        WHERE 
            c.user_id = $1
        ORDER BY 
            distance ASC
      `;

      try {
        const { rows } = await pool.query(query, [userId]);
        return rows.map(row => ({
          id: row.worker_id,
          name: row.name,
          address: row.address,
          phone: row.phone,
          profession: row.profession,
          experience: row.experience,
          is_available: row.is_available,
          city: row.city,
          aadhar: row.aadhar,
          available_from: row.available_from,
          available_to: row.available_to,
          distance: row.distance
        }));
      } catch (error) {
        console.error('Error fetching nearby workers', error);
        throw new Error('Failed to fetch nearby workers');
      }
    },



    // for worker


    workerForworker: async (_, { id }) => {
      const { rows } = await pool.query(`
        SELECT 
          id, 
          name, 
          phone,
          profession, 
          experience, 
          is_available, 
          available_from, 
          available_to
        FROM workers
        WHERE user_id = $1
      `, [id]);

      return rows[0];
    }

  },

  Mutation: {
    createWorker: async (_, { userId, phone, profession, experience, aadhar_number, latitude, longitude, address, city, name, available_from, available_to }) => {
      try {
        const result = await pool.query(
          `INSERT INTO workers (
            user_id, phone, profession, experience, aadhar, location, is_available, address, city, name, available_from, available_to
          ) VALUES (
            $1, $2, $3, $4, $5, ST_SetSRID(ST_MakePoint($6, $7), 4326), true, $8, $9, $10, $11, $12
          ) RETURNING *`,
          [userId, phone, profession, experience, aadhar_number, longitude, latitude, address, city, name, available_from, available_to]
        );

        return result.rows[0];
      } catch (error) {
        console.error("Error inserting worker:", error);
        return new Error("Failed to create worker. Please try again.");
      }
    },

    // for worker

    updateWorkerAvailability: async (_, { is_available, id }) => {
      const result = await pool.query(
        `UPDATE workers
          SET is_available = $1
          WHERE id = $2
          RETURNING *;
        `, [is_available, id]);

      return result.rows[0];
    },
  }
};

module.exports = worker_resolvers;
