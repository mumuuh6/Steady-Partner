import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { steadyContext } from '../../authentication/Steadyprovider';

const usequry = () => {
    const axiossecure=useAxiosSecure()
    const {user}=useContext(steadyContext)
    const {data:userss=[]}=useQuery({
        queryKey:['user'],
        queryFn: async ()=>{
           const res =await axiossecure.get('/user');
           return res.data;
        }
    })
    return [userss];
};

export default usequry;