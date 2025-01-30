import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import Signup from "../userinfo/Signup";

import Login from "../userinfo/Login";
import Banner from "../mainpages/Banner";
import Home from "../mainpages/Home";
import BookParcelForm from "../mainpages/Parcelinfo/BookParcelForm";
import Myparcel from "../mainpages/Parcelinfo/Myparcel";
import UserProfile from "../userinfo/UserProfile";
import Privateroute from "../authentication/Privateroute";
import Dahsboard from "../mainpages/Dahsboard";
import Allusers from "../mainpages/Allusers";
import AllDriver from "../mainpages/AllDriver";
import UpdateParcel from "../mainpages/UpdateParcel";
import Adminstatistics from "../mainpages/Adminstatistics";
import Allparcel from "../mainpages/Allparcel";
import Alldeliveredparcel from "../mainpages/Alldeliveredparcel";
import MyReviews from "../mainpages/MyReviews";
import UserRoute from "../authentication/UserRoute";
import Adminroute from "../authentication/Adminroute";
import Driverroute from "../authentication/Driverroute";
  
  
  const router = createBrowserRouter([
    
    {
      path: "/",
      element: <App></App>,
      children:[
        {
            path:'signup',
            element:<Signup></Signup>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'booking',
            element:<BookParcelForm></BookParcelForm>
        },
        {
            path:'myparcel',
            element:<UserRoute><Myparcel></Myparcel></UserRoute>
        },
        {
            path:'/updatepage/:id',
            element:<UserRoute><UpdateParcel></UpdateParcel></UserRoute>
        },

        {
            path:'myprofile',
            element:<UserRoute><UserProfile></UserProfile></UserRoute>
        },
        
        
      ]
    },
    {
        path:'dashboard',
        element:<Dahsboard></Dahsboard>,
        children:[
            {
            path:'users',
            element:<Adminroute><Allusers></Allusers></Adminroute>
        },
        {
            path:'booking',
            element:<BookParcelForm></BookParcelForm>
        },
        {
            path:'myparcel',
            element:<UserRoute><Myparcel></Myparcel></UserRoute>
        },
        {
            path:'updatepage/:id',
            element:<UserRoute><UpdateParcel></UpdateParcel></UserRoute>
        },
        {
            path:'myprofile',
            element:<UserRoute><UserProfile></UserProfile></UserRoute>
        },
        {
            path:'driver',
            element:<Adminroute><AllDriver></AllDriver></Adminroute>
        },
        {
            path:'allparcel',
            element:<Adminroute><Allparcel></Allparcel></Adminroute>
        },
        {
            path:'adminstatistics',
            element:<Adminroute><Adminstatistics></Adminstatistics></Adminroute>
        },
        {
            path:'alldeliveredparcel',
            element:<Driverroute><Alldeliveredparcel></Alldeliveredparcel></Driverroute>
        },
        {
            path:'myreviews',
            element:<Driverroute><MyReviews></MyReviews></Driverroute>
        },
    ]
    }
  ]);
  
  export default router;