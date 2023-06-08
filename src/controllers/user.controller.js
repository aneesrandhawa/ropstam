const User = require('../models/user.model')
const transporter = require('../middleware/nodemailer')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt')


function sendEMail(email, pass) {
    const mailOptions = {
        from: config.nodeMailer.user,
        to: email,
        subject: 'Ropstam',
        text: 'This is a Welcome email from Ropstam!',
        html: `<h1>Welcome</h1><p>This is your Email & Password!</p><p><b>Email: ${email}</b></p><p><b>Password: ${pass}</b></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
            return false;
        } else {
            console.log('Email sent successfully!');
            return true;
        }
    });
}


function generateRandomPassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#&-_";
    let password = "";
    const length = 8;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}


const registerUser = async (req, res) => {
    const { firstName, lastName, email } = req.body
    const verifyEmail = await User.findOne({ Username: email })
    if (!verifyEmail) {

        const password = generateRandomPassword();
        const isEmailSent = sendEMail(email, password)
        // if (isEmailSent) {
            try{
                const hashPass = await bcrypt.hash(password, 13)
                const user = new User({
                    FirstName: firstName,
                    LastName: lastName,
                    Username: email,
                    Password: hashPass
                })
                await user.save();
                res.status(201).json({ "message": "Password has been sent to your mail." })
            }catch{
                res.status(500).json({ "message": "An error occured." })
            }
        // }else{
        //     res.status(400).json({ "message": "Invalid Email." })
        // }
    } else {
        res.status(409).json({ "message": "User already exist." })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const verifyUser = await User.findOne({ Username: email })
    if (!verifyUser) {
        res.status(404).json({"message":"User not found"})
    }
    else {
        const verifypass = await bcrypt.compare(password, verifyUser.Password)
        if (verifypass) {
            const token = jwt.sign({ id: verifyUser._id }, config.jwt.secret)
            res.cookie('jwt', token, { httpOnly: true, maxAge: 20000 })
            res.status(200).json({
                "message": "Successfully Log in",
                "data": {
                    ID: verifyUser._id,
                    Name: `${verifyUser.FirstName} ${verifyUser.LastName}`,
                    Username: verifyUser.Username
                }
            })

        } else {
            res.status(500).json({
                "message": "Invalid Credentials"
            })
        }
    }
}



module.exports = { registerUser, login }