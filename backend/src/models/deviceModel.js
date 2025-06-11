const mongoose = require('mongoose');
const generateStatus = require('../utils/statusGenerator');

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
    default: 'active', // Kezdeti státusz lehet aktív
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: { // Opcionális: Hozzáadás dátuma
    type: Date,
    default: Date.now,
  },
});

// Statikus metódus a státuszok frissítésére
deviceSchema.statics.updateAllDeviceStatuses = async function() {
  try {
    const devices = await this.find({}); // Lekéri az összes eszközt
    const bulkOperations = devices.map(device => ({
      updateOne: {
        filter: { _id: device._id },
        update: { status: generateStatus() }
      }
    }));

    if (bulkOperations.length > 0) {
      await this.bulkWrite(bulkOperations); // Egyetlen kérésben frissíti az összeset
    }
    console.log('Device statuses updated in DB.');
  } catch (error) {
    console.error('Error updating device statuses:', error);
    // Hiba kezelése, pl. logolás vagy értesítés
  }
};

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device; // Exportáljuk a Mongoose Modellt