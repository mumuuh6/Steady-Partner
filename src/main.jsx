import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
import router from './path/router.jsx';
import Steadyprovider from './authentication/Steadyprovider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Steadyprovider>
        <RouterProvider router={router} />
    </Steadyprovider>
    </QueryClientProvider>
    
  </StrictMode>,
)
