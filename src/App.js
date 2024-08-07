import { RouterProvider, Navigate, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/util/AuthHttp";
import "../src/layouts/authentication/sign-in.css";
import Dashboard from "./layouts/dashBoard/dashboard.jsx";
import SignIn from "./layouts/authentication/sign-in";
import StartPage from "./layouts/startPage/StartPage";
import "./index.css";
import Home from "./layouts/Home/Home";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import Expos from "./layouts/Expos/Expos.jsx";
import ExpoDetails from "./layouts/ExpoDetails/ExpoDetails.jsx";
import Details from "./layouts/ExpoDetails/Details/Details.jsx"
import Sections from "./layouts/ExpoDetails/sections/Sections.jsx";
import Analytics from "./layouts/ExpoDetails/analytics/Analytics.jsx";
import Notifications from "./layouts/notifications/notifications.jsx";
import NewExpo from "./layouts/NewExpo/NewExpo.jsx";
import TicketDesign from "./layouts/NewExpo/TicketDesign.jsx";
import DesignScreen from "./layouts/NewExpo/DesignScreen.jsx";
import Map from "./layouts/NewExpo/Map.jsx";
import LogOut from "./layouts/LogOut/LogOut.jsx";
import CompanyDetails from "./layouts/notifications/CompanyDetails.jsx";



let theme = createTheme();
theme = responsiveFontSizes(theme);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/startPage/StartPage" />,
  },
  {
    path: "/startPage/StartPage",
    element: <StartPage />,
  },
  {
    path: "/authentication/sign-in",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "/dashboard/Home", element: <Home /> },
      { path: "/dashboard/Activity", element: <Expos /> },
      { path: "/dashboard/Activity/:id", element: <ExpoDetails />, children: [
        { path: "details", element: <Details /> },
        { path: "sections", element: <Sections /> },
        { path: "analytics", element: <Analytics /> },
      ] }, 
      { path: "/dashboard/Notifications", element: <Notifications/> },
      { path: "/dashboard/Notifications/:id", element: <CompanyDetails/> },
      { path: "/dashboard/NewExpo", element: <NewExpo/> },
      { path: "/dashboard/NewExpo/Map", element: <Map/> },
      { path: "/dashboard/NewExpo/ticket-design", element: <TicketDesign/> },
      { path: "/dashboard/NewExpo/design-Screen", element: <DesignScreen/> },
      { path: "/dashboard/logout", element: <LogOut/> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
