import { createContext, useEffect, useState } from 'react';
import { auth } from './firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import useAxiosPublic from '../mainpages/hooks/useAxiosPublic';
import axios from 'axios';
import useAxiosSecure from '../mainpages/hooks/useAxiosSecure';
export const steadyContext = createContext(null)
const Steadyprovider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)
    const AxiosPublic=useAxiosPublic();
    //const axiossecure=useAxiosSecure();
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentuser=>{
            setuser(currentuser);
            if(currentuser){
                const userInfo={email:currentuser.email}
                AxiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                        setloading(false)
                    }
                    
                })
            }
            else{
                localStorage.removeItem('access-token')
                setloading(false)
            }
            
        })
        return ()=>{
            return unsubscribe()
        }
    },[AxiosPublic])
    
    const createuser=(email,password)=>{
        setloading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const updateProfileData = (profile) => {
        return updateProfile(auth.currentUser, profile);
      };
    const loginuser=(email,password)=>{
        setloading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout=()=>{
        setloading(true)
        return signOut(auth)
    }
    
      
    const provider = new GoogleAuthProvider();
    const googleSignIn = () => {
      setloading(true);
      return signInWithPopup(auth, provider).finally(() => setloading(false));
    };
    const steadyinfo = {
        user, 
        loading,
        
        updateProfileData,
        googleSignIn,
        createuser,
        loginuser,
        logout,
    }
    return (
        <steadyContext.Provider value={steadyinfo}>
            {children}
        </steadyContext.Provider>
    );
};

export default Steadyprovider;