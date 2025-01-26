import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './path/router.jsx';
import Steadyprovider from './authentication/Steadyprovider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Steadyprovider>
      <RouterProvider router={router} />
    </Steadyprovider>
  </StrictMode>,
)
