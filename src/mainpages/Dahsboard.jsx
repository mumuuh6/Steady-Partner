import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAxiosSecure from './hooks/useAxiosSecure';
import { steadyContext } from '../authentication/Steadyprovider';
import useAdmin from './hooks/useAdmin';
import useDriver from './hooks/useDriver';
import useUser from './hooks/useUser';

const Dahsboard = () => {  
    const [isDriver]=useDriver()
    const [isAdmin]=useAdmin()
    const [isUser]=useUser()
    console.log(isDriver,isUser,isAdmin)
    return (
        <div className='flex'>
            <div className="w-64 min-h-screen bg-green-600">
                <ul className='menu flex flex-col gap-2 justify-center items-center p-4'>
                    
                    {isUser &&<>
                        <li className='bg-white p-2 rounded-xl font-semibold'>
                        <NavLink to={`/dashboard/booking`}>
                            Book A Parcel
                        </NavLink>
                    </li>
                    <li className='bg-white p-2 rounded-xl font-semibold'>
                        <NavLink to={`/dashboard/myparcel`}>
                           MyParcel
                        </NavLink>
                    </li>
                    <li className='bg-white p-2 rounded-xl font-semibold'>
                        <NavLink to={`/dashboard/myprofile`}>
                           MyProfile
                        </NavLink>
                    </li></>}
                    {
                        isAdmin &&<>
                        <li className='bg-white p-2 rounded-xl font-semibold'>
                        <NavLink to={`/dashboard/users`}>
                            Allusers
                        </NavLink>
                    </li>
                    <li className='bg-white p-2 rounded-xl font-semibold'>
                        <NavLink to={`/dashboard/driver`}>
                            All Deliveryman
                        </NavLink>
                    </li>
                    <li className='bg-white p-2 rounded-xl font-semibold'>
                        <NavLink to={`/dashboard/allparcel`}>
                            All Parcel
                        </NavLink>
                    </li>
                    <li className='bg-white p-2 rounded-xl font-semibold'>
                        <NavLink to={`/dashboard/adminstatistics`}>
                            Dashboard
                        </NavLink>
                    </li></>
                    }
                    {isDriver &&<>
                        <li className='bg-white p-2 rounded-xl font-semibold'>
                        <NavLink to={`/dashboard/alldeliveredparcel`}>
                            All Delivered Parcel
                        </NavLink>
                    </li>
                    <li className='bg-white p-2 rounded-xl font-semibold'>
                        <NavLink to={`/dashboard/myreviews`}>
                           My Reviews
                        </NavLink>
                    </li></>}
                   
                </ul>
            </div>
            <div className='flex-1'><Outlet></Outlet></div>
        </div>
    );
};

export default Dahsboard;