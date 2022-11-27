import React, { useContext } from 'react';
import { Navigate,  useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useSeller from '../../hooks/useSeller';
import Loading from '../Loading/Loading';

const SellerRoute = ({children}) => {
  const { user,loader } =useContext(AuthContext);
    const [seller,setSellerLoading]=useSeller(user?.email)
    const location=useLocation()
    if(loader || setSellerLoading ){
        return <Loading></Loading>
    }
    if (user && seller) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location}} replace></Navigate>
};

export default SellerRoute;