// src/pages/ExpoDetails/ExpoDetails.js
import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchExpoDetails } from '../../util/ExposHttp';
import "./ExpoDetails.css";
import SearchBar from '../../components/SearchBar/SearchBar';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuth } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ExpoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeLink, setActiveLink] = useState('details');

  const { data: expo, error, isLoading } = useQuery({
    queryKey: ['expoDetails', id],
    queryFn: () => fetchExpoDetails(user.accessToken, id),
  });
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!expo) return <p>Expo not found</p>;

  return (
    <>
      <SearchBar />
      <div className="expo-details">
        <div>
          <div className="expo-details-nav">
            <button onClick={() => navigate("/dashboard/Activity")} className="back-button">
              <FaArrowLeft />
            </button>
            <Link
              to="details"
              className={activeLink === 'details' ? 'active' : ''}
              onClick={() => setActiveLink('details')}
            >
              Details
            </Link>
            <Link
              to="sections"
              className={activeLink === 'sections' ? 'active' : ''}
              onClick={() => setActiveLink('sections')}
            >
              Sections
            </Link>
            <Link
              to="analytics"
              className={activeLink === 'analytics' ? 'active' : ''}
              onClick={() => setActiveLink('analytics')}
            >
              Analytics
            </Link>
          </div>
          <div className="expo-details-content">
            <Outlet context={{ expo }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ExpoDetails;
