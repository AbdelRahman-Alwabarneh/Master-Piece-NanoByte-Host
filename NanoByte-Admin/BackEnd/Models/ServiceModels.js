const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      OrderNumber: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    privateIP: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'expired', 'cancelled', 'refunded'],
        required: true
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
