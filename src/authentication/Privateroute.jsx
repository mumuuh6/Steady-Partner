import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { steadyContext } from "./Steadyprovider";
import { Progress } from "@/components/ui/progress"

const Privateroute = ({children}) => {
    const { user, loading } = useContext(steadyContext)
    if (user) {
        return children;
    }
    if (loading){
        return  <Progress value={33} />
    }
    return (
        <div>
            <Navigate to='/login'></Navigate>
        </div>
    );
};

export default Privateroute;