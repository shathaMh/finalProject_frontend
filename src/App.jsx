import React from 'react'
import { Routes, Route, Navigate } from 'react-router';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Signup from './Components/Sigup/Signup';
import About from './Components/About/About';
import "./index.css";
import Logout from './Components/Logout/Logout';
import Profile from './Components/Profile/Profile';
import Sidebar from './Components/Sidebar/Sidebar';
import "./App.css";

export default function App() {
    return (
        <div >
                <Sidebar />
                <div className="mainStyle ms-auto" >
                    <Navbar /> 
               
                <Routes >
                        <Route path='/' element={<Navigate to='/home' />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/logout' element={<Logout />} />
                </Routes>
            <Footer />
                </div>
        </div>
    )
}
