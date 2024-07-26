import React from 'react';
import Draggable from 'react-draggable';
import './DesignScreen.css';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';

const DesignScreen = () => {


  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard/NewExpo/design-Screen')
  };

  const handlePrevious = () => {
    navigate(-1);
  };


  return (
    <>
    <SearchBar />
    <div className="ScreenDesign">
      <form className="expoForm3">
        <div className="mobile-frame">
          <Draggable>
            <div className="draggable-item">
              <img src="https://via.placeholder.com/200" alt="placeholder" />
            </div>
          </Draggable>
          <Draggable>
            <div className="draggable-item">
              <p>Draggable Text</p>
            </div>
          </Draggable>
          <Draggable>
            <div className="draggable-item">
              <div className="product">
                <img src="https://via.placeholder.com/50" alt="product" />
                <p>Product Name</p>
                <p>$99.99</p>
              </div>
            </div>
          </Draggable>
        </div>
        <div className="button-group">
          <button type="button" className="previousButton" onClick={handlePrevious}>
            Previous
          </button>
          <button type="button" className=" NextButton" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </form>
    </div></>
  );
};

export default DesignScreen;
