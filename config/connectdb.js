const mongoose = require('mongoose');
require('dotenv').config();
async function connectdatabase() {
  mongoose.set('strictQuery', false);
  await mongoose
    .connect(process.env.Mongo_url, { useNewUrlParser: true })
    .then(() => console.log('Database Connected!'));
}

module.exports = connectdatabase;
