import React from 'react';
import "./Profile.css";
import avatar from "../../assets/images/avatar.png";
import ProfileTabs from "../ProfileTabs/ProfileTabs.jsx";

const Profile = () => {
  return (
    <div className='profile'>
      <div className='avatar'>
        <img src={avatar} alt="avatar" />
        <p className='Name'>sara akkad</p>
        <span>bussiness women</span>
      </div>
      <div className='Tabs'>
        <ProfileTabs /> 
      </div>
      <div className='Line'></div>
      <div className='About'>
        <h2>About </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget mauris eu augue dictum fringilla non ac nulla.</p>
      </div>
    </div>
  );
}

export default Profile;
