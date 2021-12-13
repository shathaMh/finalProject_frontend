import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css";
/*
*/
export default function Navbar() {
    return (
        <div className="pe-3 py-2">
            <div className="Navbar shadow-lg d-flex justify-content-between align-content-center py-2 ">
                <div className=" w-75 ms-3 rounded-3 ">
                    <input placeholder="Search" type="text" className="searchInput w-50 border-0 px-4 py-2" />
                </div>

                <ul className="nav fs-6 fw-bold mx-2">
                    <li className="nav-item">
                        <NavLink to="/signup" className="nav-link link-dark">Sign Up</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" className="nav-link link-dark">Log In</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/logout" className="nav-link link-dark">Log Out</NavLink>
                    </li>
                </ul>
        </div>
            <button type="button" className="btn btn-primary mx-5 my-4">Boulevards</button>
            <button type="button" className="btn btn-primary mx-5 my-4">oasis</button>
            <button type="button" className="btn btn-primary mx-5 my-4">barks</button>
            {/* <button type="button" className="btn btn-primary mx-5 my-4">Primary</button>
            <button type="button" className="btn btn-primary mx-5 my-4">Primary</button> */}
        </div>
        
    )
}
