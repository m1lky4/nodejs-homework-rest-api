
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const authenticate = require('./middleware/authenticate');

const MONGODB_URI = 'mongodb+srv://m1lky4:200468Li@m1lky4.za6hlbl.mongodb.net/db-contacts';
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successful'))
  .catch((error) => console.error('Database connection error:', error));

app.use('/api/contacts', authenticate, contactsRouter);
app.use('/api/users', usersRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

