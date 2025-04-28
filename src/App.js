import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./Pages/HomeScreen";
import Blog from "./Pages/Blog";
import CardGame from "./Pages/CardGame";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/homeScreen" />} />
      <Route path="/homeScreen" element={<HomeScreen />} />
      <Route path="/cardGame" element={<CardGame />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}

export default App;
