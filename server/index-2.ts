// const User = require('./models/user.model');
// const RefreshToken = require('./models/refreshtoken.model');
// const categorySubTopicList = require('./models/categorySubTopicList.model');
// const express = require('express');
// require('dotenv').config();
// const app = express();
// const cors = require('cors');
// const { default: mongoose } = require('mongoose');
// const jwt = require('jsonwebtoken');
// const sendForgotPasswordEmail = require('./utils/sendEmail.js');
// const port = 4011;

// app.use(cors());
// app.use(express.json());

// const connectDatabase = async () => {
//   try {
//     // mongoose.set('useNewUrlParser', true);
//     await mongoose.connect(
//       'mongodb+srv://vivek:XztbrjMuRMKIPQo8@cluster0.9o444.mongodb.net/?retryWrites=true&w=majority',
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//     console.log('connected to database');
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// connectDatabase();

// //forgot password

// app.post('/api/forgotPassword', async (req, res, next) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });
//   // console.log(user._id);
//   if (!user) {
//     res.status(404).json({ message: 'user not found !' });
//   }

//   //user exist, create a one time link for 15 mins

//   const payload = {
//     email: user.email,
//     expiresIn: new Date().setSeconds(new Date().getSeconds() + 900),
//   };
//   const token = jwt.sign(payload, process.env.TOKEN_KEY);
//   const link = `http://localhost:3002/resetPassword/${user.email}/${token}`;
//   console.log(link);
//   // sendForgotPasswordEmail(user.email, link);

//   res.status(200).json('password reset link has been sent to your email!');
// });

// //reset password
// app.post('/api/resetPassword/:fName/:token', async (req, res, next) => {
//   const { newPasswordOne, newPasswordTwo, email, token } = req.body;
//   const payload = jwt.verify(token, process.env.TOKEN_KEY);

//   if (payload.expiresIn < new Date().getTime()) {
//     res.status(410).json({ message: 'link is expired, try again !' });
//     return;
//   }
//   const user = await User.findOne({ email });
//   if (!user) {
//     res.status(404).json({ message: 'user not found !' });
//     return;
//   }

//   if (newPasswordOne !== newPasswordTwo) {
//     res.status(406).json({ message: 'paswords don not match !' });
//     return;
//   }
//   console.log('here');
//   const updatedInfo = await User.updateOne(
//     { email: user.email },
//     {
//       $set: { password: newPasswordOne },
//     }
//   );
//   console.log('here:', updatedInfo);
//   if (updatedInfo.modifiedCount === 1 || updatedInfo.matchedCount === 1) {
//     res.status(201).json({ message: 'password successfully updated!' });
//     return;
//   }
// });

// //get homepage products

// app.get('/api/categoryListProducts', async (req, res) => {
//   try {
//     const categoryListProducts = await categorySubTopicList.find();

//     res.status(200).json(categoryListProducts);
//   } catch (error) {
//     res.status(500).json({ anda: error.message });
//   }
// });

// app.post('/api/register', async (req, res) => {
//   console.log(req.body);

//   try {
//     const { fName, lName, email, password } = req.body;

//     if (!(email && password && fName && lName)) {
//       return res.status(400).send('All inputs are required');
//     }

//     const oldUser = await User.findOne({ email });
//     if (oldUser) {
//       return res.status(409).send('User Already Exist. Please Login');
//     }

//     // add user to DB
//     const user = await User.create({
//       fName: fName,
//       lName: lName,
//       email: email.toLowerCase(), //sanitize: convert email to lowercase
//       password: password,
//     });

//     // Create token
//     const token = jwt.sign(
//       {
//         fName: fName,
//         email: email,
//         expiresIn: new Date().getTime() + 360000,
//       },
//       process.env.TOKEN_KEY
//     );
//     let refreshToken = await RefreshToken.createToken(user);

//     const newUserInstance = {
//       fName: fName,
//       lName: lName,
//       email: email,
//       accessToken: token,
//       refreshToken,
//     };
//     return res.json({ status: 201, user: newUserInstance });

//     //catch error
//   } catch (error) {
//     console.log(error);
//     res.json({ status: 'error', error: error.message });
//   }
// });

// app.post('/api/login', async (req, res) => {
//   console.log(req.body);

//   const user = await User.findOne({
//     email: req.body.email,
//     password: req.body.password,
//   });
//   console.log(user);
//   if (user) {
//     const { fName, lName, email, password } = user;
//     const token = jwt.sign(
//       {
//         fName: fName,
//         email: email,
//         expiresIn: new Date().getTime() + 360000,
//       },
//       process.env.TOKEN_KEY
//     );
//     let refreshToken = await RefreshToken.createToken(user);
//     const newUserInstance = {
//       fName: fName,
//       lName: lName,
//       email: email,
//       accessToken: token,
//       refreshToken,
//     };

//     console.log('user:', newUserInstance);
//     return res.json({ status: 200, user: newUserInstance });
//   } else {
//     return res.status(404).json({
//       message: 'please check email or password!',
//     });
//   }
// });

// app.post('/api/refreshtoken', async (req, res) => {
//   const { refreshToken: requestToken } = req.body;

//   if (requestToken == null) {
//     return res.status(403).json({ message: 'Refresh Token is required!' });
//   }

//   try {
//     const refreshToken = await RefreshToken.findOne({ token: requestToken });
//     if (!refreshToken) {
//       res.status(403).json({ message: 'Refresh token is not in database!' });
//       return;
//     }
//     if (RefreshToken.verifyExpiration(refreshToken)) {
//       RefreshToken.findByIdAndRemove(refreshToken._id, {
//         useFindAndModify: false,
//       }).exec();

//       res.status(403).json({
//         message: 'Refresh token was expired. Please make a new signin request',
//       });
//       return;
//     }
//     let newAccessToken = jwt.sign(
//       {
//         id: refreshToken.user._id,
//         expiresIn: new Date().setSeconds(new Date().getSeconds() + 360),
//       },
//       process.env.TOKEN_KEY
//     );

//     return res.status(200).json({
//       accessToken: newAccessToken,
//       refreshToken: refreshToken.token,
//     });
//   } catch (err) {
//     return res.status(500).send({ message: err });
//   }
// });

// app.listen(port, () => {
//   console.log(`app listening at http://localhost:${port}`);
// });
