import { createContext, useEffect, useState } from 'react';
import { auth } from './firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
export const steadyContext = createContext(null)
const Steadyprovider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentuser=>{
            setuser(currentuser);
            setloading(false)
        })
        return ()=>{
            return unsubscribe()
        }
    },[])
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
      setLoader(true);
      return signInWithPopup(auth, provider).finally(() => setLoader(false));
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