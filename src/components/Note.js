import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Note = () => {
    const context = useContext(noteContext);
    const { note, getNotes, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currentnote) => {
        ref.current.click();
        setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    }

    const [Enote, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const handleClick = (e) => {
        editNote(Enote.id, Enote.etitle, Enote.edescription, Enote.etag);
        refClose.current.click();
    }
    const onChange = (e) => {
        setnote({ ...Enote, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <AddNote />
            <div className="row my-3">

                {/* <!-- Button trigger modal --> */}
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className=" mb-3">
                                        <label htmlFor="etitle" className="form-label">Edit note title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={Enote.etitle} onChange={onChange} minLength={5} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Edit note description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={Enote.edescription} onChange={onChange} minLength={5} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Edit note tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={Enote.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <h2>Your Notes</h2>
                <div className="container mx-2"> 
                {Note.length===0 && 'No notes to display'}
                </div>
                {note.map((Note) => {
                    return <NoteItem key={Note._id} updateNote={updateNote} note={Note} />
                })}
            </div>
        </>
    )
}

export default Note