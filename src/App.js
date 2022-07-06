import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState'
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar title="iNoteBook" />
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
