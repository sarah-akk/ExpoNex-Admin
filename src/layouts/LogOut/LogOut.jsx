import React from 'react';
import { useLogoutMutation } from '../../util/AuthHttp';
import SearchBar from "../../components/SearchBar/SearchBar"

const LogOut = () => {
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <><SearchBar />
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div></>
  );
};

export default LogOut;
