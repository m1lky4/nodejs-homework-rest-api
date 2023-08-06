const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://m1lky4:200468Li@m1lky4.za6hlbl.mongodb.net/db-contacts';

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
