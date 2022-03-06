import axios from 'axios';
import '../constants/api';
import DATABASE_URL from '../constants/api';
import INote from '../interfaces/note.interface';
export const getNotes = async () => {
  try {
    const response = await axios.get(DATABASE_URL);
    const notesArray = response.data.listOfNotes;
    return notesArray;
  } catch (err) {
    console.log(err);
  }
};
export const addNewNotes = async (newNote: Partial<INote>) => {
  try {
    const response = await axios.post(
      'https://notesapp55.herokuapp.com/postData',
      newNote
    );
    const notesArray = response.data.note;
    return notesArray;
  } catch (err) {
    console.log(err);
  }
};
export const updateNotes = async (updatedNote: INote) => {
  try {
    const response = await axios.put(
      `https://notesapp55.herokuapp.com/updateNotes/${updatedNote._id}`,
      updatedNote
    );
    const notesArray = response.data.note;
    return notesArray;
  } catch (err) {
    console.log(err);
  }
};
export const deleteNotes = async (idOfDeletedNote: string) => {
  try {
    const response = await axios.delete(
      `https://notesapp55.herokuapp.com/deleteNotes/${idOfDeletedNote}`
    );
    const notesArray = response.data.replay;
    return notesArray;
  } catch (err) {
    console.log(err);
  }
};
