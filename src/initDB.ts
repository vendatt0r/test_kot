import { pool } from './db';

export async function initDB() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      total_seats INT
    );
  `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      event_id INT REFERENCES events(id),
      user_id VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

    const res = await pool.query('SELECT COUNT(*) FROM events');
    if (parseInt(res.rows[0].count, 10) === 0) {
        await pool.query(`
      INSERT INTO events (name, total_seats)
      VALUES ('Rock Festival', 3), ('Jazz Night', 5);
    `);
    }

    console.log('Database initialized');
}
