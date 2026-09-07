const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Registration = require('../models/Registration');

// POST /api/events - Create new event
router.post('/events', async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const newEvent = new Event({ title, description, date, location });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/events - List all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/events/:id - Get event details
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/register - Register user for an event
router.post('/register', async (req, res) => {
  try {
    const { eventId, userName, userEmail } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const existing = await Registration.findOne({ event: eventId, userEmail });
    if (existing) {
      return res.status(400).json({ error: 'User already registered for this event' });
    }

    const registration = new Registration({ event: eventId, userName, userEmail });
    await registration.save();

    res.status(201).json({ message: 'Registration successful', registration });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/registrations/user/:email - View user registrations
router.get('/registrations/user/:email', async (req, res) => {
  try {
    const registrations = await Registration.find({ userEmail: req.params.email }).populate('event');
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;