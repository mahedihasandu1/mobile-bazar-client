import React, { createContext, useEffect, useState } from 'react';
import app from '../FireBase/FireBase.init';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

const auth = getAuth(app)
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, SetLoading] = useState(false)

    const signIn=(email,password)=>{
        SetLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const createUser = (email, password) => {
        SetLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        return signOut(auth)
    }
    const googleLogin=(provider)=>{
        return signInWithPopup(auth,provider)
    }

    const updateUser = (userInfo) => {
        SetLoading(true)
        return updateProfile(auth.currentUser, userInfo)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            SetLoading(false)
        });
        return () => unsubscribe();
    }, [])
    const userInfo = {
        user,
        createUser,
        updateUser,
        logOut,
        signIn,
        googleLogin,
        loading,



    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;