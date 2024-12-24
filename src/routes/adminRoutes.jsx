import React from 'react';
//import Sidebar from '../components/adminPanel/common_components/Sidebar'
import OverviewPage from '../components/adminPanel/pages/OverviewPage'
import AnalyticsPage from '../components/adminPanel/pages/AnalyticsPage'
import JobPage from '../components/adminPanel/pages/JobPage'
import UsersPage from '../components/adminPanel/pages/UsersPage'
import SettingsPage from '../components/adminPanel/pages/SettingsPage'

const adminRoutes = [
  {
    path: 'overview', 
    element: <OverviewPage />,
  },
  {
    path: 'analytics',
    element: <AnalyticsPage />,
  },
  {
    path: 'products',
    element: <JobPage />,
  },
  {
    path: 'users',
    element: <UsersPage />,
  },
  {
    path: 'settings',
    element: <SettingsPage />,
  },
];

export default adminRoutes;



