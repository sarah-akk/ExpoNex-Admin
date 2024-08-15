import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const customMarkerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconAnchor: [12, 41],
});

const DraggableMarker = ({ position, setPosition, onMapDataChange }) => {
  const markerRef = useRef(null);

  useMapEvents({
    click(e) {
      const newLatLng = e.latlng;
      const coordinates = {
        lat: newLatLng.lat,
        lng: newLatLng.lng,
      };
      setPosition(coordinates);
      onMapDataChange({
        location: 'Selected Location',
        coordinates: JSON.stringify(coordinates),
      });
    },
  });

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const newLatLng = marker.getLatLng();
        const coordinates = {
          lat: newLatLng.lat,
          lng: newLatLng.lng,
        };
        setPosition(coordinates);
        onMapDataChange({
          coordinates: JSON.stringify(coordinates),
        });
      }
    },
  };


  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={customMarkerIcon}
    />
  );
};

const MapComponent = ({ onMapDataChange }) => {
  const [position, setPosition] = useState({ lat: 33.5138, lng: 36.2765 });

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <DraggableMarker position={position} setPosition={setPosition} onMapDataChange={onMapDataChange} />
    </MapContainer>
  );
};

export default MapComponent;
