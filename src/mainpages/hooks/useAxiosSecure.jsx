import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { steadyContext } from "../../authentication/Steadyprovider";


export const axiosSecure=axios.create({
    baseURL:'https://steady-partner-server-side.vercel.app'
})
const useAxiosSecure = () => {
    const nav=useNavigate()
    const {logout}=useContext(steadyContext)
    axiosSecure.interceptors.request.use(function (config){
        const token=localStorage.getItem('access-token')
        config.headers.Authorization =`Bearer ${token}`
        return config;
    },function(error){
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(function(response){
        return response
    },async(error)=>{
        const status=error.response.status
        if(status===401){
            await logout()
            console.log('tata')
            nav('/login')
        }
        return Promise.reject(error)
    })
    return axiosSecure;
};

export default useAxiosSecure;