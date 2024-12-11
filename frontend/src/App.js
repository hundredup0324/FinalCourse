import React from "react";
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Course from './Pages/Course';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import HomePage from "./Pages/HomePage";
import AboutUs from './Pages/AboutUs';
import Register from "./Pages/Register";
import ContactUs from "./Pages/ContactUs";
import Apply from "./Pages/Apply";
import { CartProvider } from "./Components/Context/CartContext";

function App() {
  return (

    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/course" element={<Course />} />
          <Route path="/apply/:id" element={<Apply />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
    
  );
}

export default App;
