import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Settings.css';
import { useAuth } from "../../context/AuthContext";

const Settings = () => {

  const { user } = useAuth();


  const handleSave = () => {
    alert('Settings saved!');
  };

  return (
    <>
      <SearchBar />
      <div className='ExposBG'>
        <div className='settings-container'>
          <h2 className='settings-title'>Settings</h2>
          <div className='settings-section'>
            <h3 className='settings-subtitle'>User Information</h3>
            <div className='settings-input-group'>
              <label className='settings-label' htmlFor='username'>Username</label>
              <input
                id='username'
                name='username'
                className='settings-input'
                value={user.username}
              />
            </div>
            <div className='settings-input-group'>
              <label className='settings-label' htmlFor='email'>Email</label>
              <input
                id='email'
                type='email'
                name='email'
                className='settings-input'
                value={user.email}
              />
            </div>
          </div>
          <div className='settings-section'>
            <h3 className='settings-subtitle'>Appearance</h3>
            <div className='settings-input-group'>
              <label className='settings-label' htmlFor='theme'>Theme</label>
              <select
                id='theme'
                name='theme'
                className='settings-input'

              >
                <option value='light'>Light</option>
                <option value='dark'>Dark</option>
              </select>
            </div>
          </div>
          <div className='settings-section'>
            <h3 className='settings-subtitle'>Notifications</h3>
            <div className='settings-input-group'>
              <label className='settings-label' htmlFor='notifications'>Receive Notifications</label>
              <select
                id='notifications'
                name='notifications'
                className='settings-input'

              >
                <option value='enabled'>Enabled</option>
                <option value='disabled'>Disabled</option>
              </select>
            </div>
          </div>
          <div className='settings-button-group'>
            <button
              className='settings-button'
              onClick={handleSave}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
