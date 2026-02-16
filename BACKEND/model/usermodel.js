import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstname: { type: String, required: true },
  middlename: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true},
  email: { type: String, required: true },
  gender: { 
    type: String, 
    required: true, 
    enum: ['male', 'female', 'other'] 
  },
  age: { type: Number, required: true, min: 0 },
  mobileno: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user'], default: "user"},
});

const User = model('User', userSchema);
export default User;
