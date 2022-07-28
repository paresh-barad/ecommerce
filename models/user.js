const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: () => {
      return this.provider !== 'email' ? false : true;
    }
  },
  password: {
    type: String
  },
  userType: {
    type: String,
    enum: ["buyer", "seller"]
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = Mongoose.model('User', UserSchema);