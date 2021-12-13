import React from 'react'
import "./Sidebar.css";
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="sideBar my-2 ms-2 shadow-lg">
            
            <ul className="list-unstyled fs-5">
                <li className="ms-5 fw-bolder">
                    <NavLink to="/home" className="nav-link link-dark fst-italic ">Logo</NavLink>
                </li>
            </ul>
            <ul className="list-unstyled fw-bold " >
                <li className="">
                    <NavLink to="/profile" className="nav-link link-dark fst-italic ">Profile</NavLink>
                </li>
                <li className="">
                    <NavLink to="/about" className="nav-link link-dark fst-italic ">About</NavLink>
                </li>
                <li className="">
                    <NavLink to="/contactus" className="nav-link link-dark fst-italic ">Contact Us</NavLink>
                </li>

            </ul>
        </div>
    )
}
