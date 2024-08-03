// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new event
router.post('/', async (req, res) => {
    const {uid, title, date, reminder,session_end,
        session_start,
        location,description ,weather} = req.body;
    const event = new Event({
        title,
        date,
        session_end,
        session_start,
        location,
        uid,
        description,
        weather,
        reminder: reminder || false,
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    try {
        const result = await Event.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an event by ID
router.put('/:id', async (req, res) => {
    const { title, date, reminder } = req.body;
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        event.title = title || event.title;
        event.date = date || event.date;
        event.reminder = reminder !== undefined ? reminder : event.reminder;

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
