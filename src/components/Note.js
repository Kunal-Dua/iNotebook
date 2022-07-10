import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Note = () => {
    const context = useContext(noteContext);
    const { note, getNotes } = context;
    const ref = useRef(null);
    const updateNote=()=>{
        ref.current.click();
    }
    useEffect(() => {
        getNotes();
    }, [])

    return (
        <>
            <AddNote />
            <div className="row my-3">

                {/* <!-- Button trigger modal --> */}
                <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <h2>Your Notes</h2>
                {note.map((Note) => {
                    return <NoteItem key={Note._id} updateNote={updateNote} note={Note} />
                })}
            </div>
        </>
    )
}

export default Note