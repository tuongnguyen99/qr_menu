const mongoose = require('mongoose');

function connect() {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  const db = mongoose.connection;

  // db listener
  db.on('error', (error) => {
    console.log(error);
    return db;
  });

  db.once('open', () => {
    console.log('Connected to Database');
    return null;
  });
}

module.exports = connect;
