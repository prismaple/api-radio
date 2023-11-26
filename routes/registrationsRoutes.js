// const router = require('express').Router();
// const jwt = require("jsonwebtoken");
// const fs = require('fs');

// // Load models
// const Registrations = require('../models/registrationsModel');

// const multer = require("multer");
// const { sendEmailOtp } = require('../helpers/sendEmailOtp');

// // const multer = require("multer");
// const storage = multer.diskStorage({
//     destination: "uploads",

//     filename: function (req, file, cb) {
//         let name = `${Date.now().toString()}-${file.originalname}`;
//         cb(null, name);
//     },
// });

// var upload = multer({ storage: storage });


// router.get("/list", async (req, res) => {
//     let list = await Registrations.find({
//         isRegistered: true,
//     }).sort({ createdAt: -1 });
//     return res.json({
//         status: true,
//         message: "List Fetched!",
//         list,
//     })
// })

// router.post('/registration', upload.fields([{ name: "otherFile" }]), async (req, res) => {
//     try {
//         if (req?.files?.otherFile) {
//             var otherFileName = req?.files?.otherFile[0].filename
//         }

//         const { email } = req.body

//         let reg = await Registrations.findOne({ email, isRegistered: true });
//         // if (!reg) {
//         //     return res.json({
//         //         status: false,
//         //         message: "Email is not verified"
//         //     });
//         // }

//         if (reg) {
//             return res.json({
//                 status: true,
//                 message: "You are already registered"
//             })
//         }

//         let data = req.body;
//         delete data.otherFile;
//         data.otherFile = otherFileName
//         data.isRegistered = true

//         console.log({ reg })
//         console.log({ ...data })

//         await Registrations.create({ ...data });
//         // await Registrations.findByIdAndUpdate(reg._id, { ...data });

//         return res.json({
//             status: true,
//             message: "Registration Successfully"
//         })
//     } catch (error) {
//         return res.json({
//             status: false,
//             message: "Server Error!",
//             error
//         })
//     }

// })


// // router.post('/registration', upload.fields([{ name: "otherFile" }]), async (req, res) => {

// //     try {
// //         if (req?.files?.otherFile) {
// //             var otherFileName = req?.files?.otherFile[0].filename
// //         }

// //         const { email } = req.body


// //         let reg = await Registrations.findOne({ email });
// //         if (!reg) {
// //             return res.json({
// //                 status: false,
// //                 message: "Email is not verified"
// //             });
// //         }

// //         if (reg.isRegistered) {
// //             return res.json({
// //                 status: true,
// //                 message: "You are already registered"
// //             })
// //         }

// //         let data = req.body;
// //         delete data.otherFile;
// //         data.otherFile = otherFileName
// //         data.isRegistered = true

// //         console.log({ reg })
// //         console.log({ ...data })

// //         await Registrations.findByIdAndUpdate(reg._id, { ...data });

// //         return res.json({
// //             status: true,
// //             message: "Registration Successfully"
// //         })
// //     } catch (error) {
// //         return res.json({
// //             status: false,
// //             message: "Server Error!",
// //             error
// //         })
// //     }

// // })


// router.post('/submitWork', upload.fields([{ name: "workFile" }]), async (req, res) => {
//     try {
//         const { email } = req.body;

//         if (!req?.files?.workFile) {
//             return res.json({
//                 status: false,
//                 message: "Work File are required"
//             })
//         }

//         var workFileName = req?.files?.workFile[0].filename;

//         let registration = await Registrations.findOne({ email, isRegistered: true });

//         if (!registration) { // If not registered

//             // Delete the uplaoded file
//             const filePath = 'uploads/' + workFileName;
//             fs.unlink(filePath, (err) => console.log({ err }));

//             return res.json({
//                 status: false,
//                 message: "You are not registered"
//             })
//         }

//         // if (registration?.workFile) { // If already submit the work

//         //     // Delete the uplaoded file
//         //     const filePath = 'uploads/' + workFileName;
//         //     fs.unlink(filePath, (err) => console.log({ err }));

//         //     return res.json({
//         //         status: false,
//         //         message: "You already submit your work",
//         //     })
//         // }

//         registration.workFile = [...registration.workFile, workFileName];
//         await registration.save();

//         console.log("Im here gursewak")

//         return res.json({
//             status: true,
//             message: "Work File Upload Successfully"
//         })
//     } catch (error) {
//         console.log({ error })
//         return res.json({
//             status: false,
//             message: "Server Error!",
//             error
//         })
//     }
// })


// router.post('/sendotp_email', async (req, res) => {
//     try {
//         const { type, email } = req.body;
//         let otp = Math.floor(1000 + Math.random() * 9000);
//         console.log({ email })

//         let user = await Registrations.findOne({ email })

//         var html, subject;
//         if (type == "REGISTRATION") {

//             if (!user) {
//                 // Register with Email
//                 user = await Registrations.create({ email, emailOtp: otp });
//             } else {
//                 if (user.isRegistered) {
//                     return res.json({
//                         status: false,
//                         message: "Email is alredy registered"
//                     })
//                 }
//             }

//             user.emailOtp = otp;
//             await user.save();

//             subject = "Please confirm your email for Registration";
//             html = `<h1>Email Confirmation</h1>
//                     <p>OTP : ${otp}</p>
//                     </div>`
//         }

//         if (type == "SUBMIT") {


//             if (!user) {
//                 return res.json({
//                     status: false,
//                     message: "You are not registered"
//                 })
//             }

//             user.emailOtp = otp;
//             await user.save();

//             subject = "Please confirm your email to Submit Your Work";
//             html = `<h1>Email Confirmation</h1>
//                     <p>OTP : ${otp}</p>
//                     </div>`
//         }

//         sendEmailOtp(email, html, subject);

//         return res.json({
//             status: true,
//             message: `OTP Send successfully at email ${email}`
//         })

//     } catch (error) {
//         return res.json({
//             status: false,
//             message: `Server Error`,
//             error
//         })
//     }
// });


// router.post('/verify_otp', async (req, res) => {
//     try {
//         const { email, otp } = req.body;

//         let user = await Registrations.findOne({ email }).select("emailOtp")

//         if (!user) {
//             return res.json({
//                 status: false,
//                 message: "Invalid Email"
//             })
//         }

//         if (user.emailOtp != otp) {
//             return res.json({
//                 status: false,
//                 message: "Invalid Otp"
//             })
//         }

//         return res.json({
//             status: true,
//             message: "Email Verified"
//         })

//     } catch (error) {
//         return res.json({
//             status: false,
//             message: `Server Error`,
//             error
//         })
//     }
// });




// module.exports = router
