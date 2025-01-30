import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { steadyContext } from '../../authentication/Steadyprovider';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const axiossecure=useAxiosSecure()
    const {user}=useContext(steadyContext)
    const {data:isAdmin,isPending:isAdminLoading}=useQuery({
        queryKey:[user?.email,'isAdmin'],
        queryFn:async()=>{
            const res= await axiossecure.get(`/user/admin/${user.email}`)
            return res.data?.admin
        }
    })
    return  [isAdmin,isAdminLoading]
};

export default useAdmin;