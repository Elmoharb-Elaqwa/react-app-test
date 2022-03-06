import { FC, FocusEvent } from 'react';
import INote from '../../interfaces/note.interface';
import './Note.css';

type Props = {
  note: INote;
  updateNote: (note: INote) => void;
  deleteNote: (note: INote) => void;
};

const Note: FC<Props> = ({ note, updateNote, deleteNote }) => {
  const onTextUpdate = (event: FocusEvent<HTMLDivElement>) => {
    const newTextUpdated = event.currentTarget.textContent;
    if (newTextUpdated === note.text) {
      return;
    }
    const newNoteUpdated = {
      ...note,
      text: newTextUpdated || '',
    };
    updateNote(newNoteUpdated);
  };

  return (
    <div className="note ">
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => {
          deleteNote(note);
        }}
      ></button>
      <div
        className="note__text"
        onBlur={onTextUpdate}
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {note.text}
      </div>
      <div className="note__link">
        <a href={note.link}>{note.link}</a>
      </div>
    </div>
  );
};

export default Note;
