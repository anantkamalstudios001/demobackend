const mongoose = require('mongoose');
const connections = {};

const getDbConnection = (collegeName) => {
  const dbName = `${collegeName}_db`; // example: 'mba_db', 'pharmacy_db'

  if (connections[dbName]) return connections[dbName];

  const conn = mongoose.createConnection(`mongodb://127.0.0.1:27017/${dbName}`);

  connections[dbName] = conn;
  return conn;
};

module.exports = { getDbConnection };


// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('MongoDB connection error:', error.message);
//   }
// };

// module.exports = connectDB;
