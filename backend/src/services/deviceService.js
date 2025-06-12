import Device from '../models/deviceModel.js';
import generateStatus from '../utils/statusGenerator.js'; 

setInterval(() => {
  Device.updateAllDeviceStatuses();
}, 3500); 

export const getAllDevices = async () => {
  return await Device.find({});
};

export const addDevice = async (deviceData) => {
  const newDevice = new Device(deviceData); 
  await newDevice.save(); 
  return newDevice;
};

export const deleteDevice = async (id) => {
  const result = await Device.findByIdAndDelete(id);
  return !!result; 
};