const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: [{ type: String, required: true }],
  from: { type: Array },
  photoUser: { type: String },
  country: { type: String },
  role: { type: String },
  uniqueString : { type: String, required: true },
  verification: { type: Boolean, required: true }
})

const User = mongoose.model('users', userSchema)
module.exports = User