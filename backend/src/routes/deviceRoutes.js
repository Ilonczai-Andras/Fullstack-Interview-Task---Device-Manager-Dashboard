import express from 'express';
import * as deviceController from '../controllers/deviceController.js';

const router = express.Router();

router.get('/', deviceController.getDevices);
router.post('/', deviceController.addDevice);
router.delete('/:id', deviceController.deleteDevice);

export default router;