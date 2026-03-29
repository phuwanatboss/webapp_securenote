const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

let notes = [];

// GET notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// POST note
app.post('/api/notes', (req, res) => {
    const token = req.headers.authorization;

    if (token !== process.env.SECRET_TOKEN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const note = req.body;
    notes.push(note);

    res.status(201).json(note);
});

// DELETE note
app.delete('/api/notes/:id', (req, res) => {
    const token = req.headers.authorization;

    if (token !== process.env.SECRET_TOKEN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    notes = notes.filter((_, i) => i != req.params.id);

    res.json({ message: 'Deleted' });
});

app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
});
app.put('/api/notes/:id', (req, res) => {
    const token = req.headers.authorization;

    if (token !== process.env.SECRET_TOKEN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    notes[req.params.id] = req.body;

    res.json(notes[req.params.id]);
});