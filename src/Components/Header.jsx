// Components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaCaretDown, FaPlus, FaListCheck, FaRightFromBracket, FaIdBadge } from "react-icons/fa6";
import stack from "../Components/logo-1753261596573.png"; // Ensure this path is correct

function Header() {
  const [role, setRole] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Refs to detect clicks outside
  const adminMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateRole = () => {
      const currentRole = localStorage.getItem('role') || '';
      setRole(currentRole);
    };
    updateRole();
    window.addEventListener('storage', updateRole);

    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener('storage', updateRole);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clears all storage
    window.dispatchEvent(new Event('storage'));
    setUserDropdownOpen(false);
    navigate('/login');
  };

  const username = localStorage.getItem('username') || 'Account';
  const userrole = localStorage.getItem('role');

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 shadow-xl border-b border-white/10 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">

        <div className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={stack}
              className="w-30 h-20 md:w-40 md:h-30 object-contain drop-shadow-lg transition-transform group-hover:scale-105" alt="EventStack Logo"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-300 ">
              EventStack
            </h1>
            <p className="hidden md:block text-sm:1rpm font-medium text-white opacity-95 tracking-wide">
              Where Every Event Find it's crowd.
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">

          <NavLink to="/home">Home</NavLink>
          <NavLink to="/events">Events</NavLink>

          {/* --- ADMIN DROPDOWN --- */}
          {role === 'admin' && (
            <div className="relative" ref={adminMenuRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${dropdownOpen ? 'bg-white/10 text-white' : 'text-indigo-100 hover:bg-white/5 hover:text-white'}`}
              >
                <span className="font-semibold">My Events</span>
                <FaCaretDown className={`text-xs transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden animate-fade-in-down origin-top-right">
                  <DropdownLink
                    to="/createEvent"
                    icon={<FaPlus className="text-cyan-400" />}
                    label="Create Event"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="h-px bg-slate-700 mx-2"></div>
                  <DropdownLink
                    to="/admin/dashboard"
                    icon={<FaListCheck className="text-lime-400" />}
                    label="Manage Events"
                    onClick={() => setDropdownOpen(false)}
                  />
                </div>
              )}
            </div>
          )}

          {/* --- USER PROFILE DROPDOWN --- */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className={`flex items-center gap-3 px-2 py-1.5 pl-3 rounded-full border border-indigo-400/30 transition-all duration-300 ${userDropdownOpen ? 'bg-indigo-600/50 border-indigo-400' : 'bg-white/5 hover:bg-white/10 hover:border-indigo-300'}`}
            >
              <div className="flex flex-col items-end leading-tight">
                <span className="text-sm font-bold text-white">{username}</span>
                <span className="text-[10px] uppercase tracking-wider text-indigo-300 font-semibold">{userrole || 'Guest'}</span>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-inner">
                <FaUser className="text-sm" />
              </div>
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden animate-fade-in-down origin-top-right">
                {userrole === 'user' && (
                  <DropdownLink
                    to="/profile"
                    icon={<FaIdBadge className="text-teal-400" />}
                    label="My Profile"
                    onClick={() => setUserDropdownOpen(false)}
                  />
                )}
                {userrole === 'user' && <div className="h-px bg-slate-700 mx-2"></div>}

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200"
                >
                  <FaRightFromBracket />
                  <span className="font-medium text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>

        </nav>
      </div>
    </header>
  );
}

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative font-medium text-indigo-100 hover:text-white "
  >
    {children}
  </Link>
);

const DropdownLink = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-white/5 hover:text-white transition-colors duration-200"
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </Link>
);

export default Header;
