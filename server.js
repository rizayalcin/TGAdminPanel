import express from 'express';
import cors from 'cors';
import DatabaseService from './services/DatabaseService.js';
import Tour from './models/Tour.js';

const app = express();
const port = process.env.PORT || 3000;

import path from 'path';
const __dirname = path.resolve(); // __dirname'i tanımlayın

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'))); // public klasörü

// Ana dizindeki css ve js klasörlerini de erişilebilir yapın
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/tours', express.static(path.join(__dirname, 'tours')));
app.use('/tools', express.static(path.join(__dirname, 'tools')));
app.use('/integrations', express.static(path.join(__dirname, 'integrations')));
app.use('/integrations', express.static(path.join(__dirname, 'integrations')));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

// API Routes
app.get('/api/tours', async (req, res) => {
    try {
        const tours = await Tour.findAll();
        res.json(tours);
    } catch (error) {
        console.error('Error fetching tours:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/tours/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) {
            return res.status(404).json({ error: 'Tour not found' });
        }
        res.json(tour);
    } catch (error) {
        console.error('Error fetching tour:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/tours', async (req, res) => {
    try {
        const tourId = await Tour.create(req.body);
        res.status(201).json({ id: tourId });
    } catch (error) {
        console.error('Error creating tour:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/tours/:id', async (req, res) => {
    try {
        await Tour.update(req.params.id, req.body);
        res.status(200).json({ message: 'Tour updated successfully' });
    } catch (error) {
        console.error('Error updating tour:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/tours/:id', async (req, res) => {
    try {
        await Tour.delete(req.params.id);
        res.status(200).json({ message: 'Tour deleted successfully' });
    } catch (error) {
        console.error('Error deleting tour:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});