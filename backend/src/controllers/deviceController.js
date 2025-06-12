import * as deviceService from '../services/deviceService.js';

export const getDevices = async (req, res, next) => {
  try {
    const devices = await deviceService.getAllDevices();
    res.status(200).json(devices);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};

export const addDevice = async (req, res, next) => {
  try {
    const { name, type, ip, location } = req.body;

    if (!name || !type || !ip || !location) {
      return res.status(400).json({ message: 'All fields (name, type, ip, location) are required.' });
    }

    const newDevice = await deviceService.addDevice({ name, type, ip, location });
    res.status(201).json(newDevice);
  } catch (error) {
    next(error);
  }
};

export const deleteDevice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deviceService.deleteDevice(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Device not found.' });
    }
    res.status(204).send(); 
  } catch (error) {
    if (error.name === 'CastError' && error.path === '_id') {
      return res.status(400).json({ message: 'Invalid device ID format.' });
    }
    next(error);
  }
};