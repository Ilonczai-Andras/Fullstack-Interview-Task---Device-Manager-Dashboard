import express from 'express';
import { getSample } from '../controllers/sample.controller.js';

const router = express.Router();

router.get('/', getSample);

export default router;
