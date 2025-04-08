const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      OrderdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
      OrderNumber: {
        type: Number,
        required: true
    },
    Servicetype: {
        type: String,
        enum: ['VPS', 'DedicatedServer', 'GameHosting'],
        required: true,
      },
    domain: {
        type: String,
    },
    privateIP: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'expired', 'cancelled', 'refunded'],
        required: true,
        default: "pending",
    },
    operatingSystem: {
        type: String,
        required: true,
        default: "Windows-Server-2019",
    },
    adminNotes: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema, 'Services');
