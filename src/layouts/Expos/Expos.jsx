import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Expos.css";
import ExpoItem from '../../components/ExpoItem/ExpoItem';
import { fetchExpos } from "../../util/ExposHttp";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAuth } from "../../context/AuthContext";

const Expos = () => {
  const { user } = useAuth();
  const { data, error, isLoading } = useQuery({
    queryKey: ['expos'],
    queryFn: () => fetchExpos(user.accessToken),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <div>Failed to fetch Expos</div>;

  return (
    <>
      <SearchBar />
      <div className='ExposBG'>
        <div className="ExposTitle">
          Running Expos:
        </div>
        <ul id="Expos">
          {data.data.map((expo) => (
            <ExpoItem key={expo.id} expo={expo} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Expos;
