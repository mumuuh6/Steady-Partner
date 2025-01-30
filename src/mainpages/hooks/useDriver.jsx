import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { steadyContext } from '../../authentication/Steadyprovider';
import useAxiosSecure from './useAxiosSecure';

const useDriver = () => {
    const axiossecure=useAxiosSecure()
    const {user}=useContext(steadyContext)
    console.log(user?.email)
    const {data:isDriver,isPending:isDriverLoading}=useQuery({
        queryKey:[user?.email,'isDriver'],
        queryFn:async()=>{
            const res= await axiossecure.get(`/user/driver/${user?.email}`)
            return res.data?.driver
        }
    })
    return  [isDriver,isDriverLoading]
};

export default useDriver;