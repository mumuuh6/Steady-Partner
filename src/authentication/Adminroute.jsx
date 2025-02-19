import React from 'react';
import useAdmin from '../mainpages/hooks/useAdmin';
import { useContext } from 'react';
import { steadyContext } from './Steadyprovider';
import { Navigate } from 'react-router-dom';
import { Progress } from "@/components/ui/progress"
const Adminroute = ({children}) => {
    const [isAdmin,isAdminLoading]=useAdmin()
    const {user,loading}=useContext(steadyContext)
    if (user && isAdmin) {
            return children;
        }
        if (loading ||isAdminLoading){
            return  <Progress value={33} />
        }
    return (
        <div>
             <Navigate to='/login'>g</Navigate>
        </div>
    );
};

export default Adminroute;