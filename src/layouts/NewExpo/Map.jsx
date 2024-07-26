import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar';
import MapComponent from '../../components/Map/MapComponent';
import { useNavigate } from 'react-router-dom';

const Map = () => {
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard/NewExpo/ticket-design')
      };
    
      const handlePrevious = () => {
        navigate(-1);
      };

  return (
    <><SearchBar />
    <div className="NewExpos">
          <form className="expoForm2">
          <MapComponent/>
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
  )
}

export default Map
