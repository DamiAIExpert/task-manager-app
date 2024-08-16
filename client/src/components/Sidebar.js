import React, { useState } from 'react';
import { FaHome, FaTasks, FaCalendar, FaUser, FaPowerOff } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css'; 
import defaultAvatar from '../assets/images/avatar1.jpg'; // Import the avatar image

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; // Assuming you have a login route
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} onMouseEnter={toggleSidebar} onMouseLeave={toggleSidebar}>
      <div className="sidebar-logo">
        <img src={defaultAvatar} alt="User Avatar" />
      </div>
      <div className="sidebar-title">Task Manager</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              <span className="icon"><FaHome /></span> 
              <span className="link-text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks" activeClassName="active">
              <span className="icon"><FaTasks /></span> 
              <span className="link-text">My Tasks</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar" activeClassName="active">
              <span className="icon"><FaCalendar /></span> 
              <span className="link-text">Calendar</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeClassName="active">
              <span className="icon"><FaUser /></span> 
              <span className="link-text">Profile</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        <FaPowerOff />
      </button>
    </div>
  );
};

export default Sidebar;
