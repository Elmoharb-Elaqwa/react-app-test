const express = require('express');
const note = require('../../db/models/note.model');
require('../../db/indexDataBase');

const notesRouter = express.Router();

notesRouter.get('/notesData', (request, response) => {
  note.find((err, notes) => {
    if (err) console.log(err);
    response.json({ listOfNotes: notes });
  });
});
notesRouter.post('/postData', (req, res) => {
  const newNote = new note(req.body);
  newNote.save().then((newnote, err) => {
    res.json({
      note: newnote,
    });
  });
});

notesRouter.get('/:id', (req, res) => {
  const noteId = req.params.id;
  note.findById(noteId, (err, note) => {
    if (err) {
      return console.log(err);
    }
    if (!note) {
      return res.status(404).json({
        message: 'note not found',
      });
    }
    res.json({
      note: note,
    });
  });
});
notesRouter.delete('/deleteNotes/:id', (req, res) => {
  const deleteNoteId = req.params.id;
  note.findByIdAndRemove(deleteNoteId, (err, note) => {
    if (err) {
      return console.log(err);
    }
    if (!deleteNoteId) {
      return res.status(404).json({
        message: 'cant enter id  ',
      });
    }
    res.json({
      replay: 'delete is successful',
    });
  });
});

notesRouter.put('/updateNotes/:id', (req, res) => {
  const noteId = req.params.id;
  const updateNote = req.body;
  note.findByIdAndUpdate(noteId, updateNote, (err, note) => {
    if (err) {
      return console.log(err);
    }
    if (!note) {
      return res.status(404).json({
        message: 'cant find id which will update  ',
      });
    }
    res.json({
      replay: 'update is successful',
      note: updateNote,
    });
  });
});

module.exports = { notesRouter };
