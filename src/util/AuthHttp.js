import { QueryClient } from "@tanstack/react-query";
import { useMutation } from '@tanstack/react-query';
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
export const queryClient = new QueryClient();


export async function loginUser({ emailValue, passwordValue }) {
  let url = "http://127.0.0.1:8000/api/v1/log/login";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ username: emailValue, password: passwordValue }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  console.log(responseData.status);
  return (response.ok)
    ? {
      success: true,
      user: {
        email: responseData.email,
        username: responseData.username,
        accessToken: responseData.access_token,
      },
    }
    : { success: false };
}

/////////////////////////////////////////////////////////////////////////////////


const logoutUser = async (token) => {
  console.log(token)
  const response = await fetch('http://127.0.0.1:8000/api/v1/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  const data = await response.json();
  console.log(data)
  if (data.status !== 'success') {
    throw new Error(data.message);
  }

  return data;
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  return useMutation({
    mutationFn: () => logoutUser(user.accessToken),
    onSuccess: () => {
      setUser(null);
      console.error('Logout error:');

      navigate("/authentication/sign-in")
    },
    onError: (error) => {
      console.error('Logout error:', error.message);
    }
  });
};


////////////////////////////////////////////////////////////////////////////////////

export async function refreshAccessToken(refreshToken) {
  const response = await fetch('http://127.0.0.1:8000/api/v1/auth/refresh-token', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refreshToken }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (data.status === 'success') {
    const newUserData = {
      ...data.data,
      accessToken: data.data.access_token,
      refreshToken: data.data.refresh_token,
    };
    localStorage.setItem('authUser', JSON.stringify(newUserData));
    return newUserData;
  } else {
    throw new Error('Token refresh failed');
  }
}
