import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Note = () => {
    const context = useContext(noteContext);
    const { note, setNotes } = context;
    return (
        <div className="row my-3">
            <h2>Your Notes</h2>
            {note.map((Note) => {
                return <NoteItem note={Note} />
            })}
        </div>
    )
}

export default Note