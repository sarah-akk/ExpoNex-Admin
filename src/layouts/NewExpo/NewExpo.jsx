import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import './NewExpo.css';
import upload from '../../assets/icons/upload.svg';
import { useFormData } from '../../context/FormContext';

const NewExpo = () => {
  const { formData, setFormData } = useFormData();
  const [selectedColor, setSelectedColor] = useState('');
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === 'file') {
      if (name === 'documents') {
        setDocuments(Array.from(files));
        setFormData((prevData) => ({
          ...prevData,
          [name]: Array.from(files),
        }));
      } else {
        const file = files[0];
        setFormData((prevData) => ({
          ...prevData,
          [name]: file,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setFormData((prevData) => ({
      ...prevData,
      theme: color,
    }));
  };

  const colors = ['#d8d8c4', '#f7a842', '#412e86', '#eb50af', '#5dca8e'];

  const handleNext = () => {
    console.log('Form Data:', formData);
    navigate('/dashboard/NewExpo/Map');
  };

  return (
    <div>
      <SearchBar />
      <div className="NewExpos">
        <form className="expoForm">
          <div className="leftSection">
            <div className='upRowSection'>
              <div className='upColumnSection'>
                <label className='ExpoName'>
                  Expo Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    placeholder='not exceed 255 characters'
                    maxLength={255}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Location:
                  <input
                    type="text"
                    name="location"
                    value={formData.location || ''}
                    placeholder='not exceed 255 characters'
                    maxLength={255}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className='ExpoImgDiv'>
                <div className='upload'>
                  <img src={upload} alt="Upload icon" />
                  <input
                    type="file"
                    name="profile_picture"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <label>
              Start Date:
              <input
                type="date"
                name="start_at"
                value={formData.start_at || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                name="end_at"
                value={formData.end_at || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Theme Color:
              <div className="colorOptions">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`colorOption ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description || ''}
                placeholder='not exceed 255 characters'
                maxLength={255}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="rightSection">
            <label>
              Ticket in Place:
              <input
                type="number"
                placeholder='100 at least'
                name="ticket_in_place"
                value={formData.ticket_in_place || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Ticket in Place Price:
              <input
                type="number"
                placeholder='at least 500 s.p'
                name="ticket_in_place_price"
                value={formData.ticket_in_place_price || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Ticket in Virtual Price:
              <input
                type="number"
                placeholder='at least 100 s.p'
                name="ticket_in_virtual_price"
                value={formData.ticket_in_virtual_price || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Ticket Prime:
              <input
                type="number"
                placeholder='50 at least'
                name="ticket_prime"
                value={formData.ticket_prime || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Ticket Prime Price:
              <input
                type="number"
                placeholder='at least 400 s.p'
                name="ticket_prime_price"
                value={formData.ticket_prime_price || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Expo Size:
              <input
                type="number"
                name="expo_size"
                value={formData.expo_size || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Block Size:
              <input
                type="number"
                name="block_size"
                value={formData.block_size || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Documents:
              <input
                type="file"
                name="documents"
                accept="application/pdf,application/msword,application/vnd.ms-excel,image/*"
                multiple
                onChange={handleInputChange}
              />
            </label>
            <button type="button" className='nextButton' onClick={handleNext}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewExpo;
