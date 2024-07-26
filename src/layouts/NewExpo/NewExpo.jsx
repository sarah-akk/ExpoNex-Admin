import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import './NewExpo.css';
import upload from '../../assets/icons/upload.svg';

const NewExpo = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedCategories(selected);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const colors = ['#d8d8c4','#f7a842', '#412e86', '#eb50af',  '#5dca8e'];

  const handleNext = () => {
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
                  <input type="text" name="expoName" />
                </label>
                <label>
                  Expo Categories:
                  <select onChange={handleCategoryChange} className='expoSelect'>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                  </select>
                </label>
              </div>
              <div className='ExpoImgDiv'>
                <div className='upload'>
                  <img src={upload} alt="Upload icon" />
                  <input type="file" accept="image/*" />
                </div>
              </div>
            </div>
            <div className='selectedCategories'>
              {selectedCategories.map((category, index) => (
                <div key={index} className='categoryItem'>{category}</div>
              ))}
            </div>
            <label>
              Start Date:
              <input type="date" name="startDate" />
            </label>
            <label>
              End Date:
              <input type="date" name="endDate" />
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
              <textarea name="description"></textarea>
            </label>
          </div>
          <div className="rightSection">
            <div className="imageGridPicker">
              <p>Image Expo Grid Picker</p>
              <div>
                <input type="file" accept="image/*" />
              </div>
            </div>
            <label>
              Number of Sections:
              <input type="number" name="numSections" />
            </label>
            <label>
              Size of Expo:
              <input type="text" name="expoSize" />
            </label>
            <button type="button" className='nextButton' onClick={handleNext}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewExpo;
