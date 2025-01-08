import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ParticipantsList } from "./ParticipantsList";
import { EditParticipant } from "./EditParticipant";
import {AddParticipant} from "./AddParticipant"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ParticipantsList />} />
          <Route path="/add" element={<AddParticipant />} />
          <Route path="/participants/:id" element={<EditParticipant />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
