import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { CgProfile } from "react-icons/cg";
import logo from "../Components/logo-1753261596573.png"

const Header = () => {
  return (
    <header className="gradient-bg  shadow-lg ">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 ">
           <img src={logo} width={130} height={100} />
          <div>
            <h1 className="text-2xl font-bold ">EventStack</h1>
            <p className="text-sl opacity-90 text-slate-900">Event Tracker</p>
          </div>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/home" className="hover:text-yellow-300 transition-colors text-white">Home</Link>
          <Link to="/events" className="hover:text-yellow-300 transition-colors text-white">Events</Link>
          <Link to="/login" className="hover:text-yellow-300 transition-colors text-white">Log In</Link>
          <Link to="/myevents" className="hover:text-yellow-300 transition-colors text-white"><CgProfile size={22}/></Link>
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
