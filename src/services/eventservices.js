// src/services/eventservices.js

// Create Event
export const createEvent = async (eventData) => {
  try {
    const response = await fetch("http://localhost:3001/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || "Failed to create event" };
    }

    return { success: true, data: result.event };
  } catch (err) {
    console.error("Error creating event:", err);
    return { success: false, error: "Network error" };
  }
};

// Get Event by ID
export const getEventById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/Event/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || "Failed to fetch event" };
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("Error fetching event:", err);
    return { success: false, error: "Network error" };
  }
};

// Update Event
export const updateEvent = async (id, eventData) => {
  try {
    const response = await fetch(`http://localhost:3001/Event/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || "Failed to update event" };
    }

    return { success: true, data: result };
  } catch (err) {
    console.error("Error updating event:", err);
    return { success: false, error: "Network error" };
  }
};
