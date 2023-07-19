import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  
  const {showAlert} = props;

  const [note, setnote] = useState({title: "", description: "", tag: ""})

  const onChange = (e)=>{
    setnote({...note, [e.target.name]: e.target.value})
  }

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setnote({title:"", description:"",tag:""})
    showAlert("Added Successfully","success");
  };

  return (
    <>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} minLength={3} required onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} minLength={5} required onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" minLength={3} value={note.tag} required onChange={onChange}/>
          </div>
          <button  type="submit" className="btn btn-primary" >Add Note</button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
