import React from 'react';
import { RouterProvider, Navigate, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src/util/AuthHttp';
import './index.css';
import Dashboard from './layouts/dashBoard/dashboard.jsx';
import SignIn from './layouts/authentication/sign-in';
import StartPage from './layouts/startPage/StartPage';
import Home from './layouts/Home/Home';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import Expos from './layouts/Expos/Expos.jsx';
import ExpoDetails from './layouts/ExpoDetails/ExpoDetails.jsx';
import Details from './layouts/ExpoDetails/Details/Details.jsx';
import Sections from './layouts/ExpoDetails/sections/Sections.jsx';
import Analytics from './layouts/ExpoDetails/analytics/Analytics.jsx';
import Notifications from './layouts/notifications/notifications.jsx';
import NewExpo from './layouts/NewExpo/NewExpo.jsx';
import TicketDesign from './layouts/NewExpo/TicketDesign.jsx';
import Map from './layouts/NewExpo/Map.jsx';
import LogOut from './layouts/LogOut/LogOut.jsx';
import CompanyDetails from './layouts/notifications/CompanyDetails.jsx';
import Settings from './layouts/Settings/Settings.jsx';
import Users from './layouts/Users/Users.jsx';
import RouteGuard from './util/RouteGuard.js';
import GridComponent from './layouts/NewExpo/Grid.jsx';
import EditExpo from './layouts/Expos/EditExpo.jsx';
import Categories from './layouts/Categories/Categories.jsx';
import Orders from './layouts/Orders/Orders.jsx';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteGuard />
  },
  {
    path: '/startPage/StartPage',
    element: <StartPage />,
  },
  {
    path: '/authentication/sign-in',
    element: <SignIn />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      { path: '/dashboard/Home', element: <Home /> },
      { path: '/dashboard/Activity', element: <Expos /> },
      {
        path: '/dashboard/Activity/:id', element: <ExpoDetails />, children: [
          { path: 'details', element: <Details /> },
          { path: 'sections', element: <Sections /> },
          { path: 'analytics', element: <Analytics /> },
        ]
      },
      { path: '/dashboard/Activity/:id/edit', element: <EditExpo /> },
      { path: '/dashboard/Users', element: <Users /> },
      { path: '/dashboard/Categories', element: <Categories /> },
      { path: '/dashboard/Notifications', element: <Notifications /> },
      { path: '/dashboard/Notifications/:id', element: <CompanyDetails /> },

      { path: '/dashboard/NewExpo', element: <NewExpo /> },
      { path: '/dashboard/NewExpo/Map', element: <Map /> },
      { path: '/dashboard/NewExpo/Grid', element: <GridComponent /> },
      { path: '/dashboard/NewExpo/ticket-design', element: <TicketDesign /> },

      { path: '/dashboard/products', element: <Orders /> },
      { path: '/dashboard/settings', element: <Settings /> },
      { path: '/dashboard/logout', element: <LogOut /> },
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
