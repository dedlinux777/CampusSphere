const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: [
            'Core Engineering',
            'Professional Elective',
            'Open Elective',
            'Lab Practical',
        ],
    },
    description: {
        type: String
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
});

module.exports = mongoose.model('Category', categorySchema);