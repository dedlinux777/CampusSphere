// signup , login , changePassword
const User = require('./../models/user');
const Profile = require('./../models/profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookie = require('cookie');

const sectionOptions = ['Section A', 'Section B', 'Section C']

const normalizeSection = (section) => {
    if (!section) {
        return ''
    }

    const trimmedSection = section.trim()
    if (sectionOptions.includes(trimmedSection)) {
        return trimmedSection
    }

    const compactSection = trimmedSection.replace(/^section\s+/i, '').toUpperCase()
    const matchedSection = sectionOptions.find(
        (option) => option.toUpperCase().endsWith(compactSection)
    )

    return matchedSection || ''
}

// ================ SEND-OTP (Bypassed) ================
exports.sendOTP = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'OTP verification is bypassed in Institutional LMS'
        });
    }
    catch (error) {
        console.log('Error in bypassed sendOTP - ', error);
        res.status(500).json({
            success: false,
            message: 'Error in bypassed sendOTP',
            error: error.message
        });
    }
}


// ================ SIGNUP ================
exports.signup = async (req, res) => {
    try {
        // extract data 
        const { firstName, lastName, email, password, confirmPassword,
            accountType, contactNumber, semester, classSection, teachingAssignments } = req.body;

        // validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType) {
            return res.status(401).json({
                success: false,
                message: 'All fields are required..!'
            });
        }

        if (accountType === 'Student') {
            const normalizedClassSection = normalizeSection(classSection)
            if (!semester || !normalizedClassSection) {
                return res.status(400).json({
                    success: false,
                    message: 'Semester and Class Section are required for Students.'
                });
            }
        }

        // check both pass matches or not
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                messgae: 'passowrd & confirm password does not match, Please try again..!'
            });
        }

        // check user have registered already
        const checkUserAlreadyExits = await User.findOne({ email });

        // if yes ,then say to login
        if (checkUserAlreadyExits) {
            return res.status(400).json({
                success: false,
                message: 'User registered already, go to Login Page'
            });
        }

        // hash - secure passoword
        let hashedPassword = await bcrypt.hash(password, 10);

        // additionDetails
        const profileDetails = await Profile.create({
            gender: null, dateOfBirth: null, about: null, contactNumber: contactNumber || null
        });

        // create entry in DB
        const userFields = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactNumber,
            accountType: accountType,
            additionalDetails: profileDetails._id,
            approved: true,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        };

        if (accountType === 'Student') {
            userFields.semester = semester;
            userFields.classSection = normalizeSection(classSection);
        }

        if (accountType === 'Instructor') {
            userFields.teachingAssignments = (teachingAssignments || []).map((assignment) => ({
                semester: assignment.semester,
                classSection: normalizeSection(assignment.classSection),
            })).filter((assignment) => assignment.classSection);
        }

        const userData = await User.create(userFields);

        // return success message
        res.status(200).json({
            success: true,
            message: 'User Registered Successfully'
        });
    }

    catch (error) {
        console.log('Error while registering user (signup)');
        console.log(error)
        res.status(401).json({
            success: false,
            error: error.message,
            messgae: 'User cannot be registered , Please try again..!'
        })
    }
}


// ================ LOGIN ================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // check user is registered and saved data in DB
        let user = await User.findOne({ email }).populate('additionalDetails');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'You are not registered with us'
            });
        }


        // comapare given password and saved password from DB
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType // This will help to check whether user have access to route, while authorzation
            };

            // Generate token 
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            user = user.toObject();
            user.token = token;
            user.password = undefined; // we have remove password from object, not DB


            // cookie
            const cookieOptions = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true
            }

            res.cookie('token', token, cookieOptions).status(200).json({
                success: true,
                user,
                token,
                message: 'User logged in successfully'
            });
        }
        // password not match
        else {
            return res.status(401).json({
                success: false,
                message: 'Password not matched'
            });
        }
    }

    catch (error) {
        console.log('Error while Login user');
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while Login user'
        })
    }
}


// ================ CHANGE PASSWORD ================
exports.changePassword = async (req, res) => {
    try {
        // extract data
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // validation
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(403).json({
                success: false,
                message: 'All fileds are required'
            });
        }

        // get user
        const userDetails = await User.findById(req.user.id);

        // validate old passowrd entered correct or not
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        )

        // if old password not match 
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false, message: "Old password is Incorrect"
            });
        }

        // check both passwords are matched
        if (newPassword !== confirmNewPassword) {
            return res.status(403).json({
                success: false,
                message: 'The password and confirm password do not match'
            })
        }


        // hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // update in DB
        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,
            { password: hashedPassword },
            { new: true });





        // return success response
        res.status(200).json({
            success: true,
            mesage: 'Password changed successfully'
        });
    }

    catch (error) {
        console.log('Error while changing passowrd');
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while changing passowrd'
        })
    }
}