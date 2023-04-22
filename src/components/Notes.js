import React, { useContext, useEffect,useState,useRef } from "react";
import noteContext from "./context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  let history = useNavigate()
  const context = useContext(noteContext);
  const { notes, getNotes , editNote } = context;
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });
  
  useEffect(() => {
    if(localStorage.getItem('token')){
       getNotes();
    }
    else{
      history("/login")
    }
  
  });

  
  const updateNote = (currentNote) => {
    ref.current.click();
setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };

  const ref = useRef(null)
  const refClose = useRef(null)

  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("updated successfully","primary")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote  showAlert={props.showAlert}/>
      <button ref={ref} type="button" id="fk" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control my-2" id="etitle" name="etitle" value={note.etitle} placeholder="Enter title" onChange={onChange} minLength={5} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="description">description</label>
                  <input type="text" className="form-control my-2" id="edescription" name="edescription" value={note.edescription} placeholder="Enter description" onChange={onChange} minLength={5} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="tag">Tag</label>
                  <input type="text" className="form-control my-2" id="etag" name="etag" value={note.etag} placeholder="Enter description" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary" disabled={note.etitle.length<5||note.edescription.length<5}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-1">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>;
        })}
      </div>
    </>
  );
}

export default Notes;
