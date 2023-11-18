import express from 'express';
let router = express.Router()

import nodemailer from 'nodemailer';
import { ObjectId } from 'mongodb'
import { client } from '../mongodb.mjs'
import jwt from 'jsonwebtoken';
import {
    stringToHash,
    varifyHash
} from "bcrypt-inzi";
import otpGenerator from 'otp-generator';
import moment from 'moment';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "alimuzammilali76@mail.com" , 
      pass: process.env.pass, // Replace with your email password
    },
  });
const userCollection = client.db("mongocrud").collection("users");
const otpCollection = client.db("cruddb").collection("otpCodes");

router.post('/login', async (req, res, next) => {

    if (
        !req.body?.email
        || !req.body?.password
    ) {
        res.status(403);
        res.send(`required parameters missing, 
        example request body:
        {
            email: "some@email.com",
            password: "some$password",
        } `);
        return;
    }
    req.body.email = req.body.email.toLowerCase();

    try {
        let result = await userCollection.findOne({ email: req.body.email });
        console.log("result: ", result);

        if (!result) { // user not found
            res.status(403).send({
                message: "email or password incorrect"
            });
            return;
        } else { // user found


            const isMatch = await varifyHash(req.body.password, result.password)

            if (isMatch) {
                
                const token = jwt.sign({
                    isAdmin: false,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    _id: result._id,
                    email: req.body.email,
                }, process.env.SECRET, {
                    expiresIn: '24h'
                });

                const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
                const expirationDate = new Date(Date.now() + twentyFourHoursInMilliseconds);
                
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    expires: expirationDate, // Set the expiration date
                });
                

                res.send({
                    message: "login successful"
                });
              
                return;
            } else {
                res.status(401).send({
                    message: "email or password incorrect"
                })
                return;
            }
        }

    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})
router.post('/signup', async (req, res, next) => {

    if (
        !req.body?.firstName
        || !req.body?.lastName // family name, sur name
        || !req.body?.email
        || !req.body?.password
    ) {
        res.status(403);
        res.send(`required parameters missing, 
        example request body:
        {
            firstName: "some firstName",
            lastName: "some lastName",
            email: "some@email.com",
            password: "some$password",
        } `);
        return;
    }

    req.body.email = req.body.email.toLowerCase();
    // TODO: validate email


    try {
        let result = await userCollection.findOne({ email: req.body.email });
        console.log("result: ", result);

        if (!result) { // user not found

            const passwordHash = await stringToHash(req.body.password);

            const insertResponse = await userCollection.insertOne({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: passwordHash,
                createdOn: new Date()
            });
            console.log("insertResponse: ", insertResponse);

            res.send({ message: 'Signup successful' });

        } else { // user already exists
            res.status(403).send({
                message: "user already exist with this email"
            });
        }

    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})





router.post("/logout", async (req, res, next) => {
    res.clearCookie("token")
    res.send({ message: 'Logout successful' });
});










// router.post('/forget-password', async (req, res, next) => {

//     if (!req.body?.email) {
//         res.status(403);
//         res.send(`required parameters missing,
//                     example request body:
//                 {
//                     email: "some@email.com"
//                 } `);
//         return;
//     }

//     req.body.email = req.body.email.toLowerCase();

//     try {
//         const user = await userCollection.findOne({ email: req.body.email });
       

//         if (!user) { // user not found
//             res.status(403).send({
//                 message: "user not found"
//             });
//             return;
//         }

//         const otpCode = otpGenerator.generate(6, {
//             upperCaseAlphabets: false,
//             lowerCaseAlphabets: false,
//             specialChars: false
//         });

//         console.log("otpCode: ", otpCode);

//         res.send({ message: 'Forget password otp send', otp: otpCode })

//         // const mailOptions = {
//         //     from: 'alimuzammilali76@gmail.com', // Replace with your email
//         //     to: req.body.email,
//         //     subject: 'Forget Password - OTP Code',
//         //     text: `Hi ${user.firstName}! Here is your forget password OTP code, this is valid for 15 minutes: ${otpCode}`,
//         //   };
      
//         //   transporter.sendMail(mailOptions, (error, info) => {
//         //     if (error) {
//         //       console.log('Error sending email:', error);
//         //       res.status(500).send('Error sending email, please try later');
//         //     } else {
//         //       console.log('Email sent: ' + info.response);
//         //       res.send({ message: 'Forget password OTP sent' });
//         //     }
//         //   });


//         const otpCodeHash = await stringToHash(otpCode);

//         const insertResponse = await otpCollection.insertOne({
//             email: req.body.email,
//             otpCodeHash: otpCodeHash,
//             createdOn: new Date()
//         });
//         console.log("insertResponse: ", insertResponse);

//         res.send({ message: 'Forget password otp send' });

//     } catch (e) {
//         console.log("error getting data mongodb: ", e);
//         res.status(500).send('server error, please try later');
//     }
// })

// router.post('/forget-password-complete', async (req, res, next) => {

//     if (!req.body?.email
//         || !req.body.otpCode
//         || !req.body.newPassword) {

//         res.status(403);
//         res.send(`required parameters missing, 
//         example request body:
//         {
//             email: "some@email.com",
//             otpCode: "344532",
//         } `);
//         return;
//     }

//     req.body.email = req.body.email.toLowerCase();

//     try {
//         const otpRecord = await otpCollection.findOne(
//             { email: req.body.email },
//             { sort: { _id: -1 } }
//         )
//         console.log("otpRecord: ", otpRecord);

//         if (!otpRecord) { // user not found
//             res.status(403).send({
//                 message: "invalid otp"
//             });
//             return;
//         }

//         const isOtpValid = await varifyHash(req.body.otpCode, otpRecord.otpCodeHash);

//         if (!isOtpValid) {
//             res.status(403).send({
//                 message: "invalid otp"
//             });
//             return;
//         }

//         if (moment().diff(moment(otpRecord.createdOn), 'minutes') >= 15) {
//             res.status(403).send({
//                 message: "invalid otp"
//             });
//             return;
//         }

//         const passwordHash = await stringToHash(req.body.newPassword);

//         const updateResp = await userCollection.updateOne(
//             { email: otpRecord.email },
//             {
//                 $set: { password: passwordHash }
//             });
//         console.log("updateResp: ", updateResp);


//         res.send({ message: 'Forget password completed, proceed to login with new password' });

//     } catch (e) {
//         console.log("error getting data mongodb: ", e);
//         res.status(500).send('server error, please try later');
//     }
// })

router.post('/forget-password', async (req, res, next) => {

    if (!req.body?.email) {
        res.status(403);
        res.send(`required parameters missing,
                    example request body:
                {
                    email: "some@email.com"
                } `);
        return;
    }

    req.body.email = req.body.email.toLowerCase();

    try {
        const user = await userCollection.findOne({ email: req.body.email });

        if (!user) { // user not found
            res.status(403).send({
                message: "user not found"
            });
            return;
        }

        const otpCode = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        console.log("otpCode: ", otpCode);

        const otpCodeHash = await stringToHash(otpCode);

        const insertResponse = await otpCollection.insertOne({
            email: req.body.email,
            otpCodeHash: otpCodeHash,
            createdOn: new Date()
        });
        console.log("insertResponse: ", insertResponse);

        res.send({ message: 'Forget password otp send', otp: otpCode });

    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
});

router.post('/forget-password-complete', async (req, res, next) => {

    if (!req.body?.email || !req.body.otpCode || !req.body.newPassword) {
        res.status(403);
        res.send(`required parameters missing, 
        example request body:
        {
            email: "some@email.com",
            otpCode: "344532",
            newPassword: "new-password",
        } `);
        return;
    }

    req.body.email = req.body.email.toLowerCase();

    try {
        const otpRecord = await otpCollection.findOne(
            { email: req.body.email },
            { sort: { _id: -1 } }
        );
        console.log("otpRecord: ", otpRecord);

        if (!otpRecord) { // user not found
            res.status(403).send({
                message: "invalid otp"
            });
            return;
        }

        const isOtpValid = await varifyHash(req.body.otpCode, otpRecord.otpCodeHash);

        if (!isOtpValid) {
            res.status(403).send({
                message: "invalid otp"
            });
            return;
        }

        if (moment().diff(moment(otpRecord.createdOn), 'minutes') >= 15) {
            res.status(403).send({
                message: "invalid otp"
            });
            return;
        }

        const passwordHash = await stringToHash(req.body.newPassword);

        const updateResp = await userCollection.updateOne(
            { email: otpRecord.email },
            {
                $set: { password: passwordHash }
            });
        console.log("updateResp: ", updateResp);

        // You may want to remove the used OTP record from the collection
        await otpCollection.deleteOne({ _id: new ObjectId(otpRecord._id) });

        res.send({ message: 'Forget password completed, proceed to login with new password' });

    } catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
});




export default router