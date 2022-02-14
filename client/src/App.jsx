import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import "./App.css";
import ChooseShop from "./routes/ChooseShop";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<CreateRoom />} />
                    <Route path="/ChooseShop" element={<ChooseShop />} />
                    <Route path="/room/:roomID" exact element={<Room />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
