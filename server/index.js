const User = require('./models/user.model');
const RefreshToken = require('./models/refreshtoken.model');
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const port = 4011;

app.use(cors());
app.use(express.json());

const connectDatabase = async () => {
  try {
    // mongoose.set('useNewUrlParser', true);
    await mongoose.connect(
      'mongodb+srv://vivek:XztbrjMuRMKIPQo8@cluster0.9o444.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('connected to database');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDatabase();

app.post('/api/register', async (req, res) => {
  console.log(req.body);

  try {
    const { fName, lName, email, password } = req.body;

    if (!(email && password && fName && lName)) {
      return res.status(400).send('All inputs are required');
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    // add user to DB
    const user = await User.create({
      fName: fName,
      lName: lName,
      email: email.toLowerCase(), //sanitize: convert email to lowercase
      password: password,
    });

    // Create token
    const token = jwt.sign(
      {
        fName: fName,
        email: email,
        expiresIn: '3600',
      },
      process.env.TOKEN_KEY
    );
    let refreshToken = await RefreshToken.createToken(user);

    const newUserInstance = {
      fName: fName,
      lName: lName,
      email: email,
      password: password,
      token,
      refreshToken,
    };
    return res.json({ status: 201, user: newUserInstance });

    //catch error
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        fName: user.fName,
        email: user.email,
        expiresIn: '3600',
      },
      process.env.TOKEN_KEY
    );
    const refreshToken = jwt.sign(
      {
        fName: user.fName,
        email: user.email,
        expiresIn: '86400',
      },
      process.env.TOKEN_KEY
    );
    const newUserInstance = {
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      password: user.password,
      token,
      refreshToken,
    };

    console.log('user:', newUserInstance);
    return res.json({ status: 200, user: newUserInstance });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

app.get('/api/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.TOKEN_KEY
    );
    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
