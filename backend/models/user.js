const mongoose = require('mongoose')

const sectionOptions = ['Section A', 'Section B', 'Section C']

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        accountType: {
            type: String,
            enum: ['Admin', 'Instructor', 'Student'],
            reuired: true
        },
        semester: {
            type: Number,
            enum: [1, 2, 3, 4, 5, 6, 7, 8],
            required: function() {
                return this.accountType === 'Student';
            }
        },
        classSection: {
            type: String,
            enum: sectionOptions,
            required: function() {
                return this.accountType === 'Student';
            }
        },
        teachingAssignments: [
            {
                semester: {
                    type: Number,
                    enum: [1, 2, 3, 4, 5, 6, 7, 8]
                },
                classSection: {
                    type: String,
                    enum: sectionOptions,
                }
            }
        ],
        active: {
            type: Boolean,
            default: true,
        },
        approved: {
            type: Boolean,
            default: true,
        },
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
            required: true
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            }
        ],
        enrolledCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            }
        ],
        image: {
            type: String,
            required: true
        },
        token: {
            type: String
        },
        resetPasswordTokenExpires: {
            type: Date
        },
        courseProgress: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CourseProgress'

            }
        ]
    },// Add timestamps for when the document is created and last modified
    { timestamps: true }
);


module.exports = mongoose.model('User', userSchema);