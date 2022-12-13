const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const getNotes = () => {
    return readFile ('db/db.json', 'utf-8').then(rawNotes => [].concat(JSON.parse(rawNotes)))
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    getNotes().then(notes => res.json(notes))
});

app.post('/api/notes', (req, res) => {
    getNotes().then(oldNotes => {
        var newNote = {
            title:req.body.title, text:req.body.text
        }
        var newNotes = [...oldNotes, newNote]
        writeFile('db/db.json', JSON.stringify(newNotes)).then(() => res.json({
            msg:'ok'
        }))
    })
})
app.delete('/api/notes/:id', (req, res) => {
    getNotes().then(oldNotes => {
        console.log(oldNotes)
    })
})
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
});