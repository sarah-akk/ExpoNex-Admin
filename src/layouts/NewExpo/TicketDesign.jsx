import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Barcode from 'react-barcode';
import './TicketDesign.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useFormData } from '../../context/FormContext';
import { CreateExpo } from '../../util/ExposHttp';
import { useAuth } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const TicketDesign = () => {

  const { user } = useAuth();


  const [ticketData, setTicketData] = useState({
    image: '', // This will be the File object for form submission
    imageUrl: '', // This will be the URL for displaying the image
    background: '',
    title: '',
    info: '',
    barcode: '',
    imageWidth: 100,
    imageHeight: 100,
    sideType: '',
    mainType: '',
    sideStyle: '',
    mainStyle: '',
  });

  const [backgroundType, setBackgroundType] = useState('color');
  const [backgroundColor, setBackgroundColor] = useState('#d6d0d6');
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const startWidth = useRef(0);
  const startHeight = useRef(0);
  const startX = useRef(0);
  const startY = useRef(0);

  const { formData, setFormData } = useFormData();

  const [responseMessage, setResponseMessage] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const backgroundData = backgroundType === 'image'
      ? { ticket_main_type: 'picture', ticket_main_style: ticketData.background }
      : { ticket_main_type: 'color', ticket_main_style: backgroundColor };

    const updatedFormData = {
      ...formData,
      ticket_barcode: ticketData.barcode,
      ticket_title: ticketData.title,
      ticket_description: ticketData.info,
      ticket_side_type: "picture",
      ticket_side_style: ticketData.image,
      ticket_main_type: backgroundData.ticket_main_type,
      ticket_main_style: backgroundData.ticket_main_style,
    };

    setLoading(true);

    try {
      console.log(updatedFormData)
      const result = await CreateExpo(user.accessToken, updatedFormData);
      setResponseStatus('success');
      setResponseMessage('Your exhibition has been created successfully, please wait for us to reach out. Thanks.');

      console.log('Successfully submitted:', result);

    } catch (error) {
      console.error('Error submitting form data:', error);

      if (error.response && error.response.data) {
        const errorData = await error.response.json();
        setResponseStatus('error');
        setResponseMessage(`There were errors with your submission: ${Object.values(errorData.errors).flat().join(', ')}`);
      } else {
        setResponseStatus('error');
        setResponseMessage('An unknown error occurred. Please try again.');
      }
    }
    finally {
      setLoading(false);
    }
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
      // Create a URL for displaying the image
      const imageUrl = URL.createObjectURL(file);
      setTicketData(prevState => ({
        ...prevState,
        image: file,
        imageUrl: imageUrl,
      }));
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
                {ticketData.imageUrl && (
                  <img
                    src={ticketData.imageUrl}
                    alt="Ticket"
                    ref={imgRef}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
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
                <input
                  type="text"
                  name="title2"
                  value={ticketData.title}
                  onChange={handleInputChange}
                  placeholder='not exceed 127 characters'
                />
              </label>
              <label>
                Information:
                <textarea
                  name="info"
                  value={ticketData.info}
                  onChange={handleInputChange}
                  placeholder='not exceed 255 characters'
                />
              </label>
            </div>
            <div className="ticket-divider"></div>
            <div className="ticket-barcode">
              <label>
                Barcode:
                <input
                  type="text"
                  name="barcode"
                  value={ticketData.barcode}
                  onChange={handleInputChange}
                  placeholder='exactly 8 numbers'
                />
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
            <button type="submit" className="NextButton">
              Done !
            </button>
          </div>
        </form>
        {
          loading &&
          (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
              <CircularProgress />
            </Box>
          )
        }
        {responseMessage && (
          <div className={`message-card ${responseStatus}`}>
            <div className="message-card-content">
              <h2>{responseStatus === 'success' ? 'Success!' : 'Error!'}</h2>
              <p>{responseMessage}</p>
              <button onClick={() => setResponseMessage(null)}>OK</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TicketDesign;
