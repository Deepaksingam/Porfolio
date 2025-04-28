import React, { Suspense, lazy } from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./Pages/HomeScreen";
import Blog from "./Pages/Blog";
import CardGame from "./Pages/CardGame";
import ImageExtraction from "./Pages/ImageExtraction";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";
function App() {
  return (
    <>
      <Navbar/>
      <Suspense fallback={<Loader />}>

    <Routes>
      <Route path="/" element={<Navigate to="/homeScreen" />} />
      <Route path="/homeScreen" element={<HomeScreen />} />
      <Route path="/cardGame" element={<CardGame />} />
      <Route path="/imageExtraction" element={<ImageExtraction />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
    </Suspense>

          <Footer/>

    </>

  );
}

export default App;
