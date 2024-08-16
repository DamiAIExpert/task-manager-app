import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import defaultAvatar from '../assets/images/avatar1.jpg'; // Import the default profile picture
import '../styles/Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '*******', // Display password as asterisks
    profilePicture: defaultAvatar, // Set the default profile picture
  });
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  useEffect(() => {
    // Retrieve profile data exclusively from localStorage
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password') || '*******';
    const profilePicture = localStorage.getItem('profilePicture') || defaultAvatar;

    if (name && email) {
      setProfile({ name, email, password, profilePicture });
      setUpdatedProfile({ name, email, password: '', profilePicture });
    }
  }, []);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    // Update localStorage with the new profile details
    localStorage.setItem('name', updatedProfile.name);
    localStorage.setItem('email', updatedProfile.email);
    if (updatedProfile.password) {
      localStorage.setItem('password', updatedProfile.password);
    }

    // Optionally, send the updated profile to the API
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage
    const response = await fetch('http://localhost:5000/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProfile),
    });

    if (response.ok) {
      setProfile({
        name: updatedProfile.name,
        email: updatedProfile.email,
        password: '*******', 
        profilePicture: updatedProfile.profilePicture || defaultAvatar, 
      });
      setEditMode(false);
    } else {
      console.error('Failed to update profile');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader />
        <div className="profile-container">
          <div className="profile-picture-section">
            <img src={profile.profilePicture} alt="Profile" className="profile-picture" />
            <div className="profile-picture-buttons">
              <button className="btn btn-primary">Change picture</button>
              <button className="btn btn-danger">Delete picture</button>
            </div>
          </div>
          <div className="profile-info-section">
            <div className="profile-field">
              <label>Full name</label>
              <input
                type="text"
                name="name"
                value={editMode ? updatedProfile.name : profile.name}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <div className="profile-field">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={editMode ? updatedProfile.email : profile.email}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <div className="profile-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={editMode ? updatedProfile.password : profile.password}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            </div>
            <button
              className="btn btn-secondary"
              onClick={editMode ? handleUpdateProfile : handleEditClick}
            >
              {editMode ? 'Update' : 'Edit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
