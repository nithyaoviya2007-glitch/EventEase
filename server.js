
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let events = [
  {
    id: 1,
    title: "College Music Fest",
    date: "2026-12-05",
    location: "Coimbatore",
    capacity: 200
  },
  {
    id: 2,
    title: "Tech Workshop",
    date: "2026-11-15",
    location: "Chennai",
    capacity: 100
  }
];

let nextId = 3;

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EventEase API!" });
});

// GET all events
app.get("/api/events", (req, res) => {
  res.json(events);
});

// GET one event
app.get("/api/events/:id", (req, res) => {
  const event = events.find(
    e => e.id === Number(req.params.id)
  );

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json(event);
});

// POST a new event
app.post("/api/events", (req, res) => {
  const { title, date, location, capacity } = req.body;

  if (
    typeof title !== "string" || !title.trim() ||
    typeof date !== "string" || !date.trim() ||
    typeof location !== "string" || !location.trim() ||
    !Number.isInteger(capacity) || capacity < 1
  ) {
    return res.status(400).json({
      message: "Provide title, date, location and positive capacity"
    });
  }

  const newEvent = {
    id: nextId++,
    title: title.trim(),
    date,
    location: location.trim(),
    capacity
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

// PUT update an event
app.put("/api/events/:id", (req, res) => {
  const event = events.find(
    e => e.id === Number(req.params.id)
  );

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const { title, date, location, capacity } = req.body;

  if (
    typeof title !== "string" || !title.trim() ||
    typeof date !== "string" || !date.trim() ||
    typeof location !== "string" || !location.trim() ||
    !Number.isInteger(capacity) || capacity < 1
  ) {
    return res.status(400).json({
      message: "Provide valid event details"
    });
  }

  Object.assign(event, {
    title: title.trim(),
    date,
    location: location.trim(),
    capacity
  });

  res.json({
    message: "Event updated successfully",
    data: event
  });
});

// DELETE an event
app.delete("/api/events/:id", (req, res) => {
  const index = events.findIndex(
    e => e.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const deleted = events.splice(index, 1)[0];

  res.json({
    message: "Event deleted successfully",
    data: deleted
  });
});

app.listen(PORT, () => {
  console.log(`EventEase API running at http://localhost:${PORT}`);
});
