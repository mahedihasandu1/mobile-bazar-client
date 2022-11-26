import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Loading/Loading';

const AllUser = () => {
    const { data: users = [] ,refetch,isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users?userType=Buyer')
            const data = res.json();
            return data;
        }
    })

    const handleDeleteUser = (id) => {
            fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE',

            })
                .then(res => res.json)
                .then(data => {
                    toast.success("Delete successfully")
                    refetch()
                })
       
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
                        <th>Job</th>
                        <th>Favorite Color</th>

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
                                <td className='border'>{user?.userType ? user.role || user.userType : user.role}</td>

                                <td><button onClick={() => handleDeleteUser(user._id)} className='btn btn-xs btn-secondary '>Delete</button></td>
                            </tr>)
                    }
                </tbody>

            </table>
        </div>
    );
};

export default AllUser;