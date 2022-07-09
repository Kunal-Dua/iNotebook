import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Note = () => {
    const context = useContext(noteContext);
    const { note,getNotes } = context;
    useEffect(() => {
      getNotes();
    }, [])
    
    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {note.map((Note) => {
                    return <NoteItem key={Note._id} note={Note} />
                })}
            </div>
        </>
    )
}

export default Note