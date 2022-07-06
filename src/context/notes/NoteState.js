import { useState } from "react";
import noteContext from "./noteContext";

const NoteState =(props)=>{
    const intialNote=[
        {
          "_id": "62c5f3d444b9089f556bf9d9",
          "user": "62bf145eef51e8e34ee51d87",
          "title": "my title",
          "description": "wake me up",
          "tag": "personal",
          "date": "2022-07-06T20:43:00.720Z",
          "__v": 0
        },
        {
          "_id": "62c5f3e144b9089f556bf9db",
          "user": "62bf145eef51e8e34ee51d87",
          "title": "my title 2",
          "description": "remainder",
          "tag": "personal",
          "date": "2022-07-06T20:43:13.209Z",
          "__v": 0
        }
      ]
    
    const [note, setNote] = useState(intialNote);
    return(
        <noteContext.Provider value={{note,setNote}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;