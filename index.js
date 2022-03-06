const express = require('express');
const path = require('path');
const cors = require('cors');
const { notesRouter } = require('./api/v1/indexNote');
require('dotenv').config();
const app = express();
const port = process.env.PORST || 5000;

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
  response.send('Hello world !');
});

app.use('/', notesRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('notes-frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes-frontend', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Note app is running on http://localhost:${port}`);
});
