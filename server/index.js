const User = require('./models/user.model');
const express = require('express');
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
    ``;
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
      res.status(400).send('All inputs are required');
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    const user = await User.create({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.emailtoLowerCase(), // sanitize: convert email to lowercase
      password: req.body.password,
    });
    console.log(user);
    res.json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'duplicate email' });
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
      },
      'secret123'
    );
    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

app.get('/api/login', async (req, res) => {
  const token = req.headers['x-access-token'];
  try {
    const decoded = jwt.verify(token, 'secret123');
    const email = decoded.email;
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'invalid token' });
  }

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
      'secret123'
    );
    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
