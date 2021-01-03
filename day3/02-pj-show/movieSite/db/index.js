const mongoose = require('mongoose');
const dbConfig = require('../config/db.js');
mongoose.connect(dbConfig.mgDSN, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;