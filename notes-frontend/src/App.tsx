import './App.css';
import Note from './components/Note/Note';
// import axios from 'axios';
// import DUMMY_NOTES from './DUMMY_NOTES';
import { useEffect, useState } from 'react';
import INote from './interfaces/note.interface';
import './services/noteServices';
import {
  getNotes,
  addNewNotes,
  updateNotes,
  deleteNotes,
} from './services/noteServices';
import { Button, Modal, FloatingLabel, Form } from 'react-bootstrap';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    newNoteFun({
      link: '',
      text: '',
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [notesList, noteListFun] = useState<Array<INote>>([]);
  const [newNote, newNoteFun] = useState<Partial<INote>>({
    link: '',
    text: '',
  });

  const addNewNote = async () => {
    const saveNote = await addNewNotes(newNote);
    noteListFun([...notesList, saveNote]);
    handleClose();
  };

  useEffect(() => {
    // const getNoteStringFromLocalStorage = localStorage.getItem('my-notes');
    // if (getNoteStringFromLocalStorage) {
    //   const getNoteParseFromLocalStorage = JSON.parse(
    //     getNoteStringFromLocalStorage
    //   );
    //   noteListFun(getNoteParseFromLocalStorage);
    // } else {
    //  " noteListFun(DUMMY_NOTES);
    // }
    getNotesFromServer();
  }, []);

  const getNotesFromServer = async () => {
    const note = await getNotes();
    console.log(note);
    noteListFun(note);
  };

  console.log(notesList);
  const onNoteUpdate = async (noteUpdated: INote) => {
    const updatedNoteFromServer = await updateNotes(noteUpdated);
    const noteListUpdated = notesList.map((listItem: INote) => {
      if (listItem._id === updatedNoteFromServer._id) {
        return updatedNoteFromServer;
      }
      return listItem;
    });
    noteListFun(noteListUpdated);
    console.log(noteUpdated);
  };
  const onNoteDeleted = async (noteToDelete: INote) => {
    await deleteNotes(noteToDelete._id);
    const remainingNotes = notesList.filter((noteItem) => {
      return noteItem._id !== noteToDelete._id;
    });
    noteListFun(remainingNotes);
  };

  return (
    <div className="App">
      <div className="writeNotes">Write Your Notes Man</div>
      {/* <div>
        <button onClick={}>Click Me!</button>
      </div> */}
      <Button variant="dark" className="btn" onClick={handleShow}>
        <span>+</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingTextarea2" label="Text">
            <Form.Control
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                newNoteFun({
                  ...newNote,
                  text: newVal,
                });
              }}
              as="textarea"
              placeholder="Write your note here"
              style={{ height: '100px' }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Link"
            className="mb-3"
            style={{ marginTop: '10px' }}
          >
            <Form.Control
              type="url"
              placeholder="Write your note link"
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                newNoteFun({
                  ...newNote,
                  link: newVal,
                });
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addNewNote}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="notes-list">
        {notesList?.map((listItem, index) => {
          return (
            <Note
              note={listItem}
              updateNote={onNoteUpdate}
              key={index}
              deleteNote={onNoteDeleted}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
