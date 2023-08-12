const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

app.use(express.json());
app.use(cors());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use('/avatars', express.static('public/avatars'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
