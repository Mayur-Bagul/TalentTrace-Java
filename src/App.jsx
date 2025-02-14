import { createBrowserRouter, RouterProvider,Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import CompanyCreate from './components/admin/CompanyCreate'
import Applicants from './components/admin/Applicants'
import Companies from './components/admin/Companies'
import CompanySetup from './components/admin/CompanySetup'
import RecruiterCompany from './components/RecruiterCompany'
import AppliedJobTable from './components/user/AppliedJobTable'
import UserHome from './components/user/UserHome'
import Job from './components/user/Job'
import Jobs from './components/user/Jobs'
import JobApplicationForm from './components/user/JobApplicationForm'
import JobDescription from './components/user/JobDescription'
import UpdateJob from './components/admin/UpdateJob'
import OTPVerification from './components/auth/OTPVerification'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import Sidebar from './components/adminPanel/common_components/Sidebar'
import adminRoutes from './routes/adminRoutes'
import AddJobForm from './components/user/AddJobForm'


import Video from "./components/Video/Video";
import FormCard from "./components/FormCard/FormCard";
import NavBar from "./components/NavBar/NavBar";
import IncomingCall from "./components/IncomingCall/IncomingCall";

import {VideoCallProvider} from "./context/Context"




//user routes


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/chat',
    element: (
      <VideoCallProvider>
        {/* <NavBar /> */}
        <Video />
        <FormCard />
        <IncomingCall />
      </VideoCallProvider>
    ),
  },
  
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path:"/forgot-password" ,
    element:<ForgotPassword /> 
 },
 {
  path:"/verify-otp" ,
  element:<OTPVerification /> 
},
 {
    path:"/reset-password" ,
    element:<ResetPassword />
 },

//recruiter routes
//recruiter ke liye yaha se start hoga

{
  path: '/jobs',
  element: <AdminJobs /> //AdminJobs
},
{
  path: '/postjobs',
  element: <PostJob /> //post new job
},
{
  path: '//updatejob/:jobId',
  element: <UpdateJob /> //update  job
},
{
  path: '/createcompanies',
  element: <CompanyCreate /> // company create
},
{
  path: '/companies',
  element: <Companies /> // list of your recent register company + create company
},
{
  path: '/set-companies',
  element: <CompanySetup /> // edit companies 
},
{
  path: '/setCompanies/:id',
  element: <CompanySetup /> // edit companies 
},

{
    path: '/applicants',
    element: <Applicants /> // list of applicants
},
{
    path: '/jobs',
    element: <AdminJobs /> // list of jobs + create jobs
},
{
    path: '/recPage',
    element: < RecruiterCompany /> // post new job
},

  //User routes start from here
  {
    path: '/userHome',
    element: <UserHome /> // User Dashboard
  
  },
  {
    path: '/user/Job',
    element: <Job /> // User Job List
  },
  {
    path: '/user/Jobs',
    element: <Jobs /> // User Job List
  },
  {
    path: '/user/JobTable',
    element: <AppliedJobTable /> // User Job Table
  },

  {
    path: '/user/Jobform/:id',
    element: <AddJobForm /> // User Job application
  },
  {
    path: '/user/AppForm/:id',
    element: <JobApplicationForm /> // User Job application Form
  },
  {
    path: '/user/JobDescription/:id',
    element: <JobDescription /> // User Job description
  },

{
    path: '/admin/*',
    element: (
      <div>
          <Navbar />
      <ProtectedRoute requiredRole="ROLE_ADMIN">
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
          </div>
  
          <Sidebar />
         
          <div className="flex-1 p-4 overflow-y-auto">
            <Routes>
              {adminRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children?.map((childRoute, idx) => (
                    <Route key={idx} path={childRoute.path} element={childRoute.element} />
                  ))}
                </Route>
              ))}
            </Routes>
          </div>
        </div>
      </ProtectedRoute>
      </div>
    ),
},


])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
