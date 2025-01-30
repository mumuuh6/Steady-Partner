import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { steadyContext } from '../../authentication/Steadyprovider';
import useAxiosSecure from './useAxiosSecure';

const useUser = () => {
    const axiossecure=useAxiosSecure()
    const {user}=useContext(steadyContext)
    const {data:isUser,isPending:isUserLoading}=useQuery({
        queryKey:[user?.email,'isUser'],
        queryFn:async()=>{
            const res= await axiossecure.get(`/user/random/${user.email}`)
            console.log(res.data)
            return res.data?.random
        }
    })
    return  [isUser,isUserLoading]
};

export default useUser;