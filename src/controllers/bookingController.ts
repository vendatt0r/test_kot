import { Request, Response } from 'express';
import { reserveSeat } from '../services/bookingService';

export async function reserveBooking(req: Request, res: Response) {
    try {
        const { event_id, user_id } = req.body;

        if (!event_id || !user_id) {
            return res.status(400).json({ error: 'Missing event_id or user_id' });
        }

        const booking = await reserveSeat(event_id, user_id);
        res.status(201).json(booking);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
