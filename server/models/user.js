import mongoose from 'mongoose';

const {Schema} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  // eslint-disable-next-line camelcase
  refresh_token: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('users', userSchema);

export default User;

 
