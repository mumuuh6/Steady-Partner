import React from 'react';

import { useContext } from 'react';
import { steadyContext } from './Steadyprovider';
import { Navigate } from 'react-router-dom';
import useDriver from '../mainpages/hooks/useDriver';
import { Progress } from "@/components/ui/progress"
const Driverroute = ({children}) => {
    const [isDriver,isDriverLoading]=useDriver()
    const {user,loading}=useContext(steadyContext)
    if (user && isDriver) {
            return children;
        }
        if (loading ||isDriverLoading){
            return  <Progress value={33} />
        }
    return (
        <div>
             <Navigate to='/login'></Navigate>
        </div>
    );
};

export default Driverroute;