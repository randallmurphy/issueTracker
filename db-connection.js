const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
const db = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB connected like a boss 💽');
  }).catch(err => console.log(err));
module.exports = db;