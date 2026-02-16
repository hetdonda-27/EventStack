import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema({
  firstname: { type: String, required: true },
  middlename: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true},
  email: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  mobileno: { type: String, required: true }
});

const Profile = model('Profile', ProfileSchema);
export default Profile;
