// Node Modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Routes
const GetCustomer = require('./routes/api/getCustomer');
const Verify = require('./routes/api/verify');
const Recurring = require('./routes/api/recurrent-billing/createPayment');
const BillCustomer = require('./routes/api/recurrent-billing/billCustomer');

//cors
const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World'));

app.use('/api/customer', GetCustomer);
app.use('/api/customer', Verify);
app.use('/api/customer', Recurring);
app.use('/api/customer', BillCustomer);

app.listen(port, () => console.log(`Server is running on port ${port}`));
