import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, deleteUser } from '../../util/UsersHttp';
import './Users.css';
import { useAuth } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Users = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', user.accessToken],
    queryFn: () => fetchUsers(user.accessToken),
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: (userId) => deleteUser(userId, user.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries(['users', user.accessToken]);
    },
    onError: (error) => {
      console.error('Error deleting user:', error);
    },
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDelete = (userId) => {
    mutation.mutate(userId);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <div>Failed to fetch users</div>;

  const filteredUsers = data.data.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <div className='ExposBG'>
        <h1 className="ExposTitle">All Users</h1>
        <div className='usersContainer'>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user.id} className='userCard'>
                <div className='userHeader'>
                  <h2>{user.name}</h2>
                  {user.has_company ? (
                    <span className='companyBadge'>{user.has_company.name}</span>
                  ) : null}
                </div>
                <div className='userDetails'>
                  <p>Email: {user.email}</p>
                  <p>Username: {user.username}</p>
                  <p>Status: {user.is_verified ? 'Verified' : 'Not Verified'}</p>
                </div>
                <div className='userProfilePicture'>
                  {user.profile_picture ? (
                    <img src={user.profile_picture} alt={`${user.name}'s profile`} />
                  ) : (
                    <div className='defaultProfilePicture'>No Image</div>
                  )}
                  <button
                    className='deleteButton'
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div>No users found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
