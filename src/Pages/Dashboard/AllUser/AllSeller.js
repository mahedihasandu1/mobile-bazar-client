import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Loading/Loading';

const AllSeller = () => {
    const { data: users = [] ,refetch,isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://mobile-bazar-server.vercel.app/users?userType=Seller')
            const data = res.json();
            return data;
        }
    })
    const handleDeleteUser = (id) => {
        const proceed = window.confirm('Are you Confirm Delete This User')
        if(proceed){
             fetch(`https://mobile-bazar-server.vercel.app/users/${id}`, {
            method: 'DELETE',
            headers:{
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount >0){
                    toast.success("Delete successfully")  
                  }
                  refetch()
            })
        }
       
   
}
    const handleVerifySeller = id => {
        const proceed = window.confirm('Are Want To Verify This Seller')
        if(proceed){
             fetch(`https://mobile-bazar-server.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers:{
                authorization:`bearer ${localStorage.getItem('accessToken')}`
            }
            
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount>0) {
                    toast.success('Verify Admin Successful')
                    refetch()
                }
               
            })
        }
       

    }
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">

                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Type</th>
                        <th>Verify Seller</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users.length > 0 &&

                        users.map((user, i) =>
                            <tr key={user._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-10 h-10">
                                                <img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{user.name}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="text-sm">{user.email}</div>
                                </td>
                                <td className='border'>{user?.userType ?user.role    || user.userType : user.role}</td>
                                <th>
                                    {
                                        user?.status !== 'verify' ? <button onClick={() => handleVerifySeller(user?._id)}
                                            className='btn btn-xs btn-primary  text-white'>Verify</button> : <button
                                                className='btn btn-sm'>Verified</button>}

                                </th>
                                <td><button onClick={()=>handleDeleteUser(user._id)} className='btn btn-xs btn-secondary '>Delete</button></td>
                            </tr>)
                    }
                </tbody>

            </table>
        </div>
    );
};

export default AllSeller;