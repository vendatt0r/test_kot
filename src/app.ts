import express from 'express';
import bookingRoutes from './routes/bookingRoutes';
import { initDB } from './initDB';
import { connectWithRetry } from './db';

const app = express();
app.use(express.json());
app.use('/api/bookings', bookingRoutes);

const PORT = 3000;

(async () => {
    await connectWithRetry();
    await initDB();
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
})();
