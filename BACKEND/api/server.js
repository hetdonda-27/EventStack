import express, { json } from "express";
import cors from "cors";
import connect from '../config/conn.js'
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/usermodel.js";
import Event from "../model/eventsmodel.js";
import Booking from "../model/bookingmodel.js";
import Participant from "../model/participantmodel.js";
import Category from "../model/categorymodel.js"; 
import puppeteer from "puppeteer";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();
const JWT_SECRET = "E@v@E@n@T@";

// Middleware
app.use(cors());
app.use(json());

connect();

// Authentication Middleware
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("Token received:", token);
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(403).json({ error: "Invalid token" });
  }
};


app.use("/api/tickets", ticketRoutes);

app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      console.log('No categories found in database');
      return res.json([]);
    }
    res.json(categories.map(cat => cat.name));
  } catch (err) {
    console.error("Fetch categories error:", err);
    res.status(500).json({ error: "Server error while fetching categories" });
  }
});
// ---------------- REGISTER ----------------
app.post("/register", async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.username || !userData.password || !userData.email) {
      return res.status(400).json({ error: "Username, password, and email are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username: userData.username }, { email: userData.email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = userData.role || "user";

    const user = new User(userData);
    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      status: "ok",
      token,
      role: user.role,
      userId: user._id,
      username: user.username
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// ---------------- LOGIN ----------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for admin credentials
    if (email === 'admin@gmail.com' && password === 'admin123') {
      const token = jwt.sign(
        {
          userId: 'admin-id',
          username: 'admin',
          email: 'admin@gmail.com',
          role: 'admin',
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        status: "ok",
        token,
        role: 'admin',
        userId: 'admin-id',
        username: 'admin',
        email: 'admin@gmail.com',
      });
    }

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const role = user.role;

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        role: role,
        age: user.age,
        mobileno: user.mobileno
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      status: "ok",
      token,
      role,
      userId: user._id,
      username: user.username,
      email: user.email,
      gender: user.gender,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      mobileno: user.mobileno
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// ---------------------- Create Event -----------------------
app.post("/createEvent", async (req, res) => {
  try {
    const {
      title,
      category,
      organizer,
      chiefguests,
      date,
      startTime,
      endTime,
      location,
      maplink,
      college,
      price,
      desc,
      image
    } = req.body;

    if (!title || !category || !organizer || !date || !startTime || !endTime || !location || !college || !price || !desc) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    // Check if category exists in database
    const categoryExists = await Category.findOne({ name: category.toLowerCase() });
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const newEvent = new Event({
      title,
      category,
      organizer,
      chiefguests,
      date,
      startTime,
      endTime,
      location,
      maplink,
      college,
      price,
      desc,
      image
    });

    await newEvent.save();

    res.json({ status: "ok", message: "Event created successfully", event: newEvent });

  } catch (err) {
    console.error("Event creation error:", err);
    res.status(500).json({ error: "Server error while creating event" });
  }
});

// ---------------------- Get All Events -----------------------

app.get("/Event", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("Fetch events error:", err);
    res.status(500).json({ error: "Server error while fetching events" });
  }
});

//------------------------get all events by id-----------------------
app.get("/Event/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    console.error("Fetch event error:", err);
    res.status(500).json({ error: "Server error while fetching event" });
  }
});

//------------------------delete event by id-----------------------
app.delete("/Event/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Event ID" });
    }

    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ message: "Event deleted successfully", event });
  } catch (err) {
    console.error("Delete event error:", err);
    res.status(500).json({ error: "Server error while deleting event" });
  }
});

//------------------------update event by id-----------------------
app.put("/Event/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Event ID" });
    }

    if (req.body.category) {
      const categoryExists = await Category.findOne({ name: req.body.category.toLowerCase() });
      if (!categoryExists) {
        return res.status(400).json({ error: "Invalid category" });
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ message: "Event updated successfully", updatedEvent });
  } catch (err) {
    console.error("Update event error:", err);
    res.status(500).json({ error: "Server error while updating event" });
  }
});

// ---------------------- BOOKING-----------------------
app.post("/booking", authenticateToken, async (req, res) => {
  try {
    const { userId, eventId, participants, paymentMethod, amount} = req.body;

    if (!userId || !eventId || !participants || !Array.isArray(participants) || participants.length === 0 || !paymentMethod || !amount) {
      return res.status(400).json({ error: "Missing required booking information" });
    }

    const participantDocs = await Participant.insertMany(
      participants.map(p => ({
        ...p,
        userId,
        eventId
      }))
    );
    const participantIds = participantDocs.map(doc => doc._id);

    const booking = new Booking({
      userId,
      eventId,
      participantIds,
      paymentMethod,
      amount,
      paymentSuccess: true
    });

    await booking.save();

    res.json({
      status: "ok",
      bookingId: booking._id,
      message: "Payment successful"
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Payment failed. Please try again." });
  }
});

// ---------------- USER PROFILE (with booked events) ----------------
app.get("/user/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const bookings = await Booking.find({ userId: id })
      .populate("eventId")
      .populate("participantIds");

    const bookedEvents = bookings.map((booking) => ({
      bookingId: booking._id,
      eventName: booking.eventId?.title,
      eventDate: booking.eventId?.date,
      location: booking.eventId?.location,
      bookingDate: booking.bookingDate,
      totalAmount: booking.amount,
      participants: booking.participantIds.map(participant => ({
        firstname: participant.firstname,
        lastname: participant.lastname,
        email: participant.email,
        age: participant.age,
        gender: participant.gender
      }))
    }));

    res.json({
      firstname: user.firstname,
      middlename: user.middlename,
      lastname: user.lastname,
      email: user.email,
      gender: user.gender,
      age: user.age,
      mobileno: user.mobileno,
      role: user.role,
      bookedEvents,
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Server error while fetching profile" });
  }
});

//---------------------------------download_pdf----------------------------//

app.post("/download_tickets", async (req, res) => {
  try {
    // const { event, date } = req.body;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = `
  <html>
  <head>
  <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            .ticket { border: 2px dashed #333; padding: 20px; }
          </style>
          </head>
          <body>
          <h1>hello</h1></html>`;

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=ticket.pdf");
    res.send(pdfBuffer)
    }
  catch(err){
    res.status(500).send("error"+err.message);

  }
})

// Server Startup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});