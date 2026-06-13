const User = require('../models/user');
const Course = require('../models/course');
const CourseProgress = require("../models/courseProgress")
const { default: mongoose } = require('mongoose')

// ================ capture the payment (Bypassed) ================
exports.capturePayment = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: {
                currency: "INR",
                amount: 0,
                id: "dummy_order_" + Math.random().toString(36).substring(2, 9)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ================ verify the payment / direct enroll student ================
exports.verifyPayment = async (req, res) => {
    const courses = req.body?.coursesId;
    const userId = req.user.id;

    if (!courses || !userId) {
        return res.status(400).json({ success: false, message: "Required data not found" });
    }

    try {
        const student = await User.findById(userId);
        if (!student) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        for (const courseId of courses) {
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ success: false, message: `Could not find course with ID: ${courseId}` });
            }

            // Verify that course semester and classSection exactly match student settings
            if (course.semester !== student.semester || course.classSection !== student.classSection) {
                return res.status(400).json({
                    success: false,
                    message: `Course targeted at Sem ${course.semester} - Section ${course.classSection} does not match your batch (Sem ${student.semester} - Section ${student.classSection}).`
                });
            }

            // Check if student is already enrolled in the course
            const enrolled = course.studentsEnrolled.includes(userId);
            if (enrolled) {
                continue; // Skip if already enrolled
            }

            // Enroll student: update Course
            await Course.findByIdAndUpdate(
                courseId,
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            // Initialize course progress
            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            });

            // Enroll student: update User
            await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    }
                },
                { new: true }
            );
        }

        return res.status(200).json({ success: true, message: "Enrolled successfully" });
    } catch (error) {
        console.log("Error in direct enrollment verifyPayment: ", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ================ send Payment Success Email (Bypassed) ================
exports.sendPaymentSuccessEmail = async (req, res) => {
    return res.status(200).json({ success: true, message: "Payment success email bypassed" });
};