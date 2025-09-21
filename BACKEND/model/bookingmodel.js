// bookingmodel.js
import { Schema,model } from "mongoose";
const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  participantIds: [{ type: Schema.Types.ObjectId, ref: "Participant" }], // Array of participant IDs
  paymentMethod: { type: String, required: true },
  amount: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  paymentSuccess: { type: Boolean, default: true }
}, {
  timestamps: true
});

const booking = model('Bookings', bookingSchema);
export default booking;