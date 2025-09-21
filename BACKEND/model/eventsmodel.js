  import { Schema, model } from 'mongoose';

  const eventSchema = new Schema({
    
    title: { type: String, required: true },
    category: { type: String, required: true },
    organizer: { type: String ,required: true },
    chiefguests: [{ type: String }],
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    maplink: { type: String },
    college: { type: String,required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    image: { type: String },
  });

  const Event = model('Event', eventSchema);
  export default Event;