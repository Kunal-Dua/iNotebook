import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState'
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar title="iNoteBook" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
