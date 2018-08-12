// Get env Variables
require('dotenv').config();

module.exports = {
  mongoURI: process.env.DB_CONNECT,
  secretOrKey: process.env.JWT_SECRET
};
