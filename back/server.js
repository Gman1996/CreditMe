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
const GetCustomerRecurrent = require('./routes/api/recurrent-billing/getCustomer');
const VerifyRecurrent = require('./routes/api/recurrent-billing/verify');

// Navigational Routes
const Register = require('./routes/api/register/register');
const Login = require('./routes/api/auth/login');

// Profile
const CreateBillingPlan = require('./routes/api/profile/recurrent/createPayment');
const Account = require('./routes/api/profile/account');
const Discount = require('./routes/api/profile/discount');
const ChangePassword = require('./routes/api/profile/ChangePassword');
const ListPlan = require('./routes/api/profile/recurrent/listPlan');
const FetchPlan = require('./routes/api/profile/recurrent/fetchPlan');
const ActivePlan = require('./routes/api/profile/activePlan');
const CancelPlan = require('./routes/api/profile/recurrent/cancelPlan');
const EditPlan = require('./routes/api/profile/recurrent/editPlan');

// Subscribers
const ListSubscribers = require('./routes/api/profile/recurrent/subscribers/listSubscribers');
const FetchSubscribers = require('./routes/api/profile/recurrent/subscribers/fetchSubscribers');
const CancelSubscribers = require('./routes/api/profile/recurrent/subscribers/cancelSubscribers');
const ActivateSubscribers = require('./routes/api/profile/recurrent/subscribers/activateSubscribers');

//Verify BVN
const VerifyBVN = require('./routes/api/bvn/bvnValidation');

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
app.use('/api/user', CreateBillingPlan);
app.use('/api/recurrent', GetCustomerRecurrent);
app.use('/api/recurrent', VerifyRecurrent);
app.use('/api/user', Register);
app.use('/api/user', Login);
app.use('/api/user', Account);
app.use('/api/user', Discount);
app.use('/api/user', ChangePassword);
app.use('/api/user', ActivePlan);
app.use('/api/user', ListPlan);
app.use('/api/user', FetchPlan);
app.use('/api/user', CancelPlan);
app.use('/api/user', EditPlan);
app.use('/api/user', ListSubscribers);
app.use('/api/user', FetchSubscribers);
app.use('/api/user', CancelSubscribers);
app.use('/api/user', ActivateSubscribers);
app.use('/api/bvn', VerifyBVN);

app.listen(port, () => console.log(`Server is running on port ${port}`));
