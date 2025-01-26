import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import Signup from "../userinfo/Signup";

import Login from "../userinfo/Login";
  
  
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
      ]
    },
  ]);
  
  export default router;