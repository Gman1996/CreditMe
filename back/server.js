// Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Payment Logic Routes
// One time payment
const GetCustomer = require('./routes/api/one-time-payment/getCustomer');
const Verify = require('./routes/api/one-time-payment/verify');

//Recurrent Billing
const CreateBillingPlan = require('./routes/api/recurrent-billing/createPayment');
const GetCustomerRecurrent = require('./routes/api/recurrent-billing/getCustomer');
const VerifyRecurrent = require('./routes/api/recurrent-billing/verify');

// Navigational Routes
const Register = require('./routes/api/register/register');
const Login = require('./routes/api/auth/login');

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//cors
const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World'));

app.use('/api/one-time', GetCustomer);
app.use('/api/one-time', Verify);
app.use('/api/recurrent', CreateBillingPlan);
app.use('/api/recurrent', GetCustomerRecurrent);
app.use('/api/recurrent', VerifyRecurrent);
app.use('/api/user', Register);
app.use('/api/user', Login);

app.listen(port, () => console.log(`Server is running on port ${port}`));
