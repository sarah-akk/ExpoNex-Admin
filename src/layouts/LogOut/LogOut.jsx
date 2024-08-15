import React, { useState } from 'react';
import { useLogoutMutation } from '../../util/AuthHttp';
import './LogOut.css';
import SearchBar from "../../components/SearchBar/SearchBar";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LogOut = () => {
  const [loading, setLoading] = useState(false);
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    setLoading(true);
    logout();
  };

  return (
    <>
      <SearchBar />
      <div className="logout-container">
        <div className="logout-card">
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100px">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <h1 className="logout-title">Are you sure you want to log out?</h1>
              <p className="logout-text">
                Clicking the button below will log you out of your account. Please make sure to save any work before proceeding.
              </p>
              <div className="logout-button-group">
                <button
                  className="logout-button logout-button-primary"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LogOut;
