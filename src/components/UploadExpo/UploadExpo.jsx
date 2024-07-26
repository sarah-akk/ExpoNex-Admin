import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadExpo.css';
import upload from '../../assets/icons/upload.svg';

const UploadExpo = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/dashboard/NewExpo'); 
  };

  return (
    <div className='uploadDiv' onClick={handleUploadClick}>
      <div className='upload'>
        <img src={upload} alt="Upload icon" />
      </div>
      <p className='uploadText'>
        Upload new expo
      </p>
    </div>
  );
};

export default UploadExpo;
