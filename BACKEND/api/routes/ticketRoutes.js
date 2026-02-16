import express from "express";
import PDFDOCUMENT from "pdfkit";
import Booking from "../../model/bookingmodel.js";

const router = express.Router();

router.get("/download/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
      .populate("eventId")
      .populate("userId");

    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    const event = booking.eventId;
    const user = booking.userId;

    const doc = new PDFDOCUMENT();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${bookingId}_ticket.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("My Event Ticket", { align: "center" });
    doc.moveDown();

    doc.fontSize(16).text(`Event: ${event.category}`, { align: "left" });
    doc.text(`Date: ${new Date(event.date).toLocaleDateString()}`);
    doc.text(`Booked by: ${user.name || user.email}`);

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
