import mongoose from 'mongoose';
import generateStatus from '../utils/statusGenerator.js';

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  ip: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'error', 'inactive'],
    default: 'active',
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

deviceSchema.statics.updateAllDeviceStatuses = async function() {
  try {
    const devices = await this.find({});
    const bulkOperations = devices.map(device => ({
      updateOne: {
        filter: { _id: device._id },
        update: { status: generateStatus() }
      }
    }));

    if (bulkOperations.length > 0) {
      await this.bulkWrite(bulkOperations);
    }
    console.log('Device statuses updated in DB.');
  } catch (error) {
    console.error('Error updating device statuses:', error);
  }
};

const Device = mongoose.model('Device', deviceSchema);

export default Device;