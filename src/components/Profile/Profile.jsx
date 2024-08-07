import React from 'react';
import "./Profile.css";
import avatar from "../../assets/images/avatar.png";
import ProfileTabs from "../ProfileTabs/ProfileTabs.jsx";
import { useAuth } from "../../context/AuthContext.js";

const Profile = () => {

  const { user } = useAuth();

  
  return (
    <div className='profile'>
      <div className='avatar'>
        <img src={avatar} alt="avatar" />
        <p className='Name'>{user.username}</p>
        <span>{user.email}</span>
      </div>
      <div className='Tabs'>
        <ProfileTabs /> 
      </div>
      <div className='Line'></div>
      <div className='About'>
        <h2>About </h2>
        <p>An all-in-one solution for managing and organizing exhibitions, from booth allocation to visitor management and real-time analytics.</p>
      </div>
    </div>
  );
}

export default Profile;
