import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";


const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState({title:"",description:"",tag:""})
    
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title: "", description: "", tag: ""})
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div className="container my-3">
            <h2>Add Note</h2>
            <form>
                <div className=" mb-3">
                    <label htmlFor="title" className="form-label">Enter new note title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Enter new note description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Enter new note tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5}type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote