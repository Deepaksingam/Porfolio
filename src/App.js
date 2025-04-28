import React, { Suspense, lazy } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";
function App() {
  const Home = lazy(() => import("../src/Pages/HomeScreen"));

  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/homeScreen" />} />
          <Route path="/homeScreen" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
