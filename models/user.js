const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const md5 = require('md5');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.setAvatarURL = function (email) {
  this.avatarURL = `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
