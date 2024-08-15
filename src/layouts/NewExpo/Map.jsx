import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MapComponent from '../../components/Map/MapComponent';
import { useFormData } from '../../context/FormContext';
import { useNavigate } from 'react-router-dom';

const Map = () => {
  const { formData, setFormData } = useFormData();
  const navigate = useNavigate();

  const handleMapDataChange = (newMapData) => {
    // Update formData with new map data
    const updatedFormData = {
      ...formData,
      ...newMapData,
    };
    setFormData(updatedFormData);
    console.log('Updated Form Data at Map:', updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Print formData with updated map data
    console.log('Form Data at Map:', formData);
    navigate('/dashboard/NewExpo/Grid');
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <>
      <SearchBar />
      <div className="NewExpos">
        <form className="expoForm2">
          <MapComponent onMapDataChange={handleMapDataChange} />
          <div className="button-group">
            <button type="button" className="previousButton" onClick={handlePrevious}>
              Previous
            </button>
            <button type="button" className="NextButton" onClick={handleSubmit}>
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Map;
