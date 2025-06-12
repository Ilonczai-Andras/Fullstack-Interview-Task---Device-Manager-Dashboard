import express from 'express';
import deviceRoutes from './deviceRoutes.js';

const router = express.Router();

router.use('/devices', deviceRoutes);

export default router;