import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import "./App.css";
import ChooseShop from "./routes/ChooseShop";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<CreateRoom />} />
                    <Route path="/ChooseShop" element={<ChooseShop />} />
                    <Route path="/room/:roomID" element={<Room />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
