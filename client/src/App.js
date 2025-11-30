import Register from "./components/Register";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
