import { Schema, model } from 'mongoose';

const participantSchema = new Schema({
  firstname: { type: String, required: true },
  middlename: { type: String, required: false },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  gender: {
    type: String,
    required: true,   
    enum: ['male', 'female', 'other']
  },
  age: { type: Number, required: true, min: 0 },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  eventId: {
    type: Schema.Types.ObjectId, 
    required: true
  },
}, {
  timestamps: true
});

const Participant = model('Participant', participantSchema); // Changed to uppercase
export default Participant;