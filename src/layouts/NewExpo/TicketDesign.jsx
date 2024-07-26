import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Barcode from 'react-barcode'; 
import './TicketDesign.css';
import SearchBar from '../../components/SearchBar/SearchBar';

const TicketDesign = () => {
  const [ticketData, setTicketData] = useState({
    image: '',
    background: '',
    title: '',
    info: '',
    barcode: '',
    imageWidth: 100,
    imageHeight: 100
  });
  const [backgroundType, setBackgroundType] = useState('color');
  const [backgroundColor, setBackgroundColor] = useState('#d6d0d6');
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const startWidth = useRef(0);
  const startHeight = useRef(0);
  const startX = useRef(0);
  const startY = useRef(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Ticket Data:', JSON.stringify(ticketData));
    navigate('/dashboard/NewExpo/design-Screen')
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTicketData({ ...ticketData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTicketData({ ...ticketData, background: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
    setTicketData({ ...ticketData, background: e.target.value });
  };

 

  const handleDragStart = (e) => {
    if (imgRef.current) {
      startWidth.current = imgRef.current.clientWidth;
      startHeight.current = imgRef.current.clientHeight;
      startX.current = e.clientX;
      startY.current = e.clientY;
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
    }
  };

  const handleDragMove = (e) => {
    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;
    setTicketData((prevState) => ({
      ...prevState,
      imageWidth: ((startWidth.current + deltaX) / imgRef.current.parentElement.clientWidth) * 100,
      imageHeight: ((startHeight.current + deltaY) / imgRef.current.parentElement.clientHeight) * 100,
    }));
  };

  const handleDragEnd = () => {
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
  };

  return (
    <>
      <SearchBar />
      <div className="TicketDesign">
        <form className="expoForm2" onSubmit={handleSubmit}>
          <h1>Design Your Ticket</h1>
          <div
            className="ticket"
            style={{
              background:
                backgroundType === 'image'
                  ? `url(${ticketData.background}) no-repeat center center/cover`
                  : backgroundColor,
            }}
          >
            <div className="ticket-image-container">
              <div className="ticket-image" onMouseDown={handleDragStart}>
                {ticketData.image && (
                  <img
                    src={ticketData.image}
                    alt="Ticket"
                    ref={imgRef}
                    style={{
                      width: `${ticketData.imageWidth}%`,
                      height: `${ticketData.imageHeight}%`,
                      objectFit: 'cover'
                    }}
                  />
                )}
              </div>
              <label className="image-picker">
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
            <div className="ticket-details">
              <label>
                Title:
                <input type="text" name="title" className="title" value={ticketData.title} onChange={handleInputChange} />
              </label>
              <label>
                Information:
                <textarea name="info" value={ticketData.info} onChange={handleInputChange}></textarea>
              </label>
            </div>
            <div className="ticket-divider"></div>
            <div className="ticket-barcode">
              <label>
                Barcode:
                <input type="text" name="barcode" value={ticketData.barcode} onChange={handleInputChange} />
              </label>
              {ticketData.barcode && (
                <Barcode className="ticket-barcode-img" value={ticketData.barcode} />
              )}
            </div>
          </div>
          <div className="background-options">
            <label>
              Background Type:
              <select
                value={backgroundType}
                onChange={(e) => setBackgroundType(e.target.value)}
              >
                <option value="color">Color</option>
                <option value="image">Image</option>
              </select>
            </label>
            {backgroundType === 'color' ? (
              <label>
                Background Color:
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={handleBackgroundColorChange}
                />
              </label>
            ) : (
              <label>
                Background Image:
                <input type="file" accept="image/*" onChange={handleBackgroundChange} />
              </label>
            )}
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
      </div>
    </>
  );
};

export default TicketDesign;
