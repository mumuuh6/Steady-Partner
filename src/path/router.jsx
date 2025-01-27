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
  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      children:[
        {
            path:'/signup',
            element:<Signup></Signup>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/booking',
            element:<BookParcelForm></BookParcelForm>
        },
      ]
    },
  ]);
  
  export default router;