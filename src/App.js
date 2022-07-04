import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar title="iNoteBook" />
        <Routes>
          <Route path="/" element=""></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
