import React, { useContext, useState } from "react";
import noteContext from "./context/notes/noteContext";

function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  // console.log(props);

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("added successfully","success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add Note</h2>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control my-2" id="title" name="title" placeholder="Enter title of atleast 5 character" onChange={onChange} minLength={5} value={note.title} required/>
        </div>
        <div className="form-group">
          <label htmlFor="description">description</label>
          <input type="text" className="form-control my-2" id="description" name="description" placeholder="Enter description of atleast 5 character" onChange={onChange} minLength={5} value={note.description} required/>
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control my-2" id="tag" name="tag" placeholder="Enter tag" onChange={onChange}  value={note.tag}/>
        </div>
        <button type="submit" className="btn btn-primary my-2" onClick={handleClick} disabled={note.title.length<5||note.description.length<5}>
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
