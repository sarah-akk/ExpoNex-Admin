// src/components/Notifications.js
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchCompanies, fetchPending } from '../../util/CompaniesHttp';
import './notifications.css';
import { useAuth } from '../../context/AuthContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Notifications = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState('all');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [tab, user.accessToken],
    queryFn: () => {
      if (tab === 'pending') {
        return fetchPending(user.accessToken);
      }
      return fetchCompanies(user.accessToken);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <SearchBar />
      <div className="notification-table-container">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <Tabs value={tab} onChange={handleTabChange}>
                <Tab value="all" label="All Companies" />
                <Tab value="pending" label="Pending Companies" />
              </Tabs>
              <div className="notification-table-header"></div>
              <TableContainer>
                <Table className="notification-table" aria-label="company table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Owner</TableCell>
                      <TableCell>Avatar</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.data.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>{company.companyname}</TableCell>
                        <TableCell>{company.owner.name}</TableCell>
                        <TableCell>
                          <Avatar alt={company.owner.name} src={company.profile_picture} />
                        </TableCell>
                        <TableCell className={`status-${company.is_verified ? 'verified' : 'pending'}`}>
                          {company.is_verified ? 'Verified' : 'Pending'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div className="notification-head">
        <p>Requests</p>
      </div>
    </>
  );
};

export default Notifications;
