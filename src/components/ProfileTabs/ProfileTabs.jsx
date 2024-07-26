import React from 'react';
import './ProfileTabs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCog, faChartBar } from '@fortawesome/free-solid-svg-icons';

const ProfileTabs = () => {
  return (
    <div className="tabs-container">
      <div className="tab">
        <FontAwesomeIcon icon={faEnvelope} size="2x" color='white'/>
        <div className="tab-label">Messages</div>
      </div>
      <div className="tab">
        <FontAwesomeIcon icon={faCog} size="2x" color='white'/>
        <div className="tab-label">Settings</div>
      </div>
      <div className="tab">
        <FontAwesomeIcon icon={faChartBar} size="2x" color='white'/>
        <div className="tab-label">Reports</div>
      </div>
    </div>
  );
};

export default ProfileTabs;
