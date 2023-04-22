import { host } from "../../Url";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
 
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);


  // Get all notes
  const getNotes = async() => {
    // backend
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
    });
    const json = await response.json()
    // console.log(json)
    setNotes(json)
  };


  // add note
  const addNote = async(title, description, tag) => {
    // backend
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };


  // delete note
  const deleteNote = async(id) => {
    // backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)

    // frontend
    console.log("deleted note " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };


  // edit note
  const editNote = async (id, title, description, tag) => {
    // backend
    // const response =
     await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    // const json = await response.json();
    // console.log(json)

    // frontend
    let newNotes = await JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };


  return (
    <NoteContext.Provider value={{ notes, editNote, deleteNote, addNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
