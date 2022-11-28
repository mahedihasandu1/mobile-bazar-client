import { useEffect, useState } from "react"

const useAdmin=email=>{
    const [adminLoading,setAdminLoading]=useState(true)
    const [isAdmin,setIsAdmin]=useState(false);
    useEffect(()=>{
       if(email){
        fetch(`https://mobile-bazar-server.vercel.app/users/admin/${email}`)
        .then(res=>res.json())
        .then(data=>{
        //    console.log(data);
            setIsAdmin(data?.isAdmin)
            setAdminLoading(false)
        })
       }
    },[email]);
    return [isAdmin,adminLoading];
}
export default useAdmin;