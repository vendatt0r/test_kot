import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({ //если env нет то код возьмет эти значения
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'booking_system',
    password: process.env.DB_PASSWORD || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export async function connectWithRetry(retries = 5, delay = 3000) {
    while (retries > 0) {
        try {
            await pool.query('SELECT 1');
            console.log('Database connected');
            return;
        } catch (err) {
            console.log(`DB not ready, retrying in ${delay / 1000}s...`);
            retries--;
            await new Promise(r => setTimeout(r, delay));
        }
    }
    throw new Error('Unable to connect to database after retries');
}