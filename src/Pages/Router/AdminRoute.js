import React, { useContext } from 'react';
import { Navigate, UNSAFE_LocationContext } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../Loading/Loading';

const AdminRoute = ({children}) => {
    const { user,loader } = useContext(AuthContext);
    const [isAdmin,adminLoading]=useAdmin(user?.email)
    const location=UNSAFE_LocationContext()
    if(loader || adminLoading ){
        return <Loading></Loading>
    }
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location}} replace></Navigate>
};

export default AdminRoute;