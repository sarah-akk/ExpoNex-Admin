import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadExpo.css';
import upload from '../../assets/icons/upload.svg';
import { useLocation} from 'react-router-dom';

const UploadExpo = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;
  
  const handleUploadClick = () => {
    navigate('/dashboard/NewExpo'); 
  };

  const uploadDivClass =  pathname.includes("NewExpo") ? "uploadDivActive" : "uploadDiv";

  return (
    <div className={uploadDivClass} onClick={handleUploadClick}>
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
