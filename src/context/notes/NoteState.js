import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host="http://localhost:4000"
  const intialNote = []

  const [note, setNote] = useState(intialNote);

//get Notes
const getNotes = async() => {
  //api call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET', 
    headers: { 
      'Content-Type': 'application/json',
      'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmYxNDVlZWY1MWU4ZTM0ZWU1MWQ4NyIsImlhdCI6MTY1NjY4OTc2Mn0.MEdvHv7pMMaTKVjS11NgKOxQppoRCncZ8GmtrPuDDL0"
    },
  });
  const json= await response.json(); 
  setNote(json);
}

  //add note
  const addNote = async(title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json',
        'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmYxNDVlZWY1MWU4ZTM0ZWU1MWQ4NyIsImlhdCI6MTY1NjY4OTc2Mn0.MEdvHv7pMMaTKVjS11NgKOxQppoRCncZ8GmtrPuDDL0"
      },
      body: JSON.stringify({title,description,tag}) 
    });
    const json= response.json(); 

    const note_added = {
      "_id": "62c5f3d444b903489f53456bf9d9",
      "user": "62bf145eef51e8e34ee51d87",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-07-06T20:43:00.720Z",
      "__v": 0
    }
    setNote(note.concat(note_added))
  }
  //edit note
  const editNote = async(id,title, description, tag) => {
    // api call

  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYmYxNDVlZWY1MWU4ZTM0ZWU1MWQ4NyIsImlhdCI6MTY1NjY4OTc2Mn0.MEdvHv7pMMaTKVjS11NgKOxQppoRCncZ8GmtrPuDDL0"
    },
    body: JSON.stringify({title,description,tag}) 
  });
  const json= response.json(); 

    //logic to edit in client
    for (let index = 0; index < note.length; index++) {
      const element = note[index];
      if(id === element._id){
        element.title=title;
        element.description=description;
        element.tag=tag;
      }
    }
  }
  //delete note
  const deleteNote = (id) => {
    const newNote=note.filter((note_added) => { return note_added._id !== id });
    setNote(newNote);
  }

  return (
    <noteContext.Provider value={{ note, setNote, addNote, editNote, deleteNote,getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;