import React from 'react';
import '../styles/DashboardHeader.css';
import defaultAvatar from '../assets/images/avatar1.jpg';

const DashboardHeader = () => {
  const userName = localStorage.getItem('name') || 'User';

  return (
    <header className="dashboard-header">
      <div className="search-bar">
        <input type="text" placeholder="Start searching here..." />
      </div>
      <div className="user-profile">
        <img src={defaultAvatar} alt="User Avatar" className="user-avatar" />
        <span>{userName}</span>
        <button className="settings-icon">
          <img src="/path-to-your-icon/settings.png" alt="Settings" />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
