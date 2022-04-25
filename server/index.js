const app = require('express')();
const path = require('path');
const cors = require('cors');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: 'rzp_test_WJxyanJeoDleU2',
  key_secret: 'P8ubP1VTGL1FQe5ByJjG45ba',
});

app.post('/razorpay', async (req, res) => {
  const payment_capture = 1;
  const amount = 50000;
  const currency = 'INR';
  receipt = '2485hgy';
  const options = { amount, currency, receipt, payment_capture };
  try {
    const response = await razorpay.orders.create(options);
    console.log('res:', response);
    res.json({
      id: response.id,
      currency: 'INR',
      amount: response.currency,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/verification', (req, res) => {
  // do a validation
  const secret = '123456789';
  console.log(req.body);

  const crypto = require('crypto');
  const sh = crypto.createHmac('sha256', secret);
  sh.update(JSON.stringify(req.body));
  const digest = sh.digest('hex');
  console.log(digest, req.headers['x-razorpay-signature']);
  if (digest === req.headers['x-razorpay-signature']) {
    console.log('process it');
  }
  res.json({ status: 'ok' });
});

app.listen(1337, () => {
  console.log('listening on 1337...');
});
