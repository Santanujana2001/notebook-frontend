import React,{useContext} from "react";
import noteContext from "./context/notes/noteContext";

function Noteitem(props) {
  const context = useContext(noteContext)
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-regular fa-trash-can fa-lg mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("deleted successfully","warning");}}></i>
          <i className="fa-regular fa-pen-to-square fa-lg mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
