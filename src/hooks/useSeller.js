import { useEffect, useState } from 'react';

const useSeller = (email) => {
    const [sellerLoading,setSellerLoading]=useState(true)
    const [seller,setSeller]=useState(false);
    useEffect(()=>{
        if(email){
         fetch(`http://localhost:5000/users/seller/${email}`)
         .then(res=>res.json())
         .then(data=>{
            setSeller(data?.seller)
            setSellerLoading(false)
         })
        }
     },[email]);
     return [seller,sellerLoading];
};

export default useSeller;