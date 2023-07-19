import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) =>{

    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setnotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json() 
      setnotes(json)
    }

    //add a note
    const addNote = async (title, description, tag) =>{
      //API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
         },
        body: JSON.stringify({title,description,tag}), 
      });
      
      const note = await response.json()      
      setnotes(notes.concat(note))
      
    }

    //delete a note
    const deleteNote = async (id) =>{

      //API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
          
        }
      });

      const json = response.json();
      console.log(json)
      
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setnotes(newNotes);
    }

    //edit a note
    const editNote = async (id, title, description, tag) =>{
      //API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
          
        },
        body: JSON.stringify({title,description,tag}), 
      });
    
      console.log(await response.json())

      let newNotes = JSON.parse(JSON.stringify(notes))

      //logic to update at client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index]
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setnotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;