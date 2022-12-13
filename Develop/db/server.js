const express = require('express');
const app = express();

app.listen(3636);

const fs = require('fs');
const path = require('path');

app.get('/', (req, res) => {
    res.render('Develop/public/index.html')
});

app.get('/notes', (req, res) => {
    res.render('Develop/public/notes.html')
});

app.get('/api/notes', (req, res) => {
    res.render('Develop/db/db.json')
});

app.post('/api/notes', (req, res) => {
    res.append('Develop/db/db.json')
});