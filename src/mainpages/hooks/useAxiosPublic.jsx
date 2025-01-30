import axios from "axios";

export const AxiosPublic=axios.create({
    baseURL:'https://steady-partner-server-side.vercel.app'
})
const useAxiosPublic = () => {
    return AxiosPublic;
};

export default useAxiosPublic;