import { pool } from '../db';

export async function reserveSeat(eventId: number, userId: string) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const existingBooking = await client.query(
            'SELECT * FROM bookings WHERE event_id = $1 AND user_id = $2',
            [eventId, userId]
        );

        if ((existingBooking.rowCount ?? 0) > 0) {
            throw new Error('User has already booked this event');
        }

        const event = await client.query(
            'SELECT id, total_seats FROM events WHERE id = $1',
            [eventId]
        );
        if ((event.rowCount ?? 0) === 0) {
            throw new Error('Event not found');
        }

        const bookedSeats = await client.query(
            'SELECT COUNT(*) FROM bookings WHERE event_id = $1',
            [eventId]
        );

        const totalSeats = event.rows[0].total_seats;
        const reservedSeats = parseInt(bookedSeats.rows[0].count, 10);

        if (reservedSeats >= totalSeats) {
            throw new Error('No seats available');
        }

        const result = await client.query(
            'INSERT INTO bookings (event_id, user_id, created_at) VALUES ($1, $2, NOW()) RETURNING *',
            [eventId, userId]
        );

        await client.query('COMMIT');
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}
