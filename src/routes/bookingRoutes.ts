import { Router } from 'express';
import { reserveBooking } from '../controllers/bookingController';

const router = Router();
router.post('/reserve', reserveBooking);

export default router;
