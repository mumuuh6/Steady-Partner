import React from 'react';
import useAdmin from '../mainpages/hooks/useAdmin';
import { useContext } from 'react';
import { steadyContext } from './Steadyprovider';
import { Navigate } from 'react-router-dom';
import useUser from '../mainpages/hooks/useUser';
import { Progress } from "@/components/ui/progress"
const UserRoute = ({children}) => {
    const [isUser,isUserLoading]=useUser()
    const {user,loading}=useContext(steadyContext)
    if (user && isUser) {
            return children;
        }
        if (loading ||isUserLoading){
            return  <Progress value={33} />
        }
    return (
        <div>
             <Navigate to='/login'></Navigate>
        </div>
    );
};

export default UserRoute;