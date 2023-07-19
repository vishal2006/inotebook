import React, {useContext}  from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const {showAlert} = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex flex-row-reverse">
            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);showAlert("Note Deleted Successfully","success")}}></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
