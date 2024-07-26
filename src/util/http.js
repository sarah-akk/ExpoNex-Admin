import { QueryClient } from "@tanstack/react-query";
import { token } from "stylis";

export const queryClient = new QueryClient();

export async function loginUser({ emailValue, passwordValue }) {
  let url = "http://127.0.0.1:8000/api/login";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email: emailValue, password: passwordValue }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  console.log(responseData.status);
  return responseData.status === 200
    ? {
        success: true,
        user: {
          name: responseData.user.name,
          email: responseData.user.email,
          avatar: responseData.user.avatar,
          token: responseData.user.token,
        },
      }
    : { success: false };
}
