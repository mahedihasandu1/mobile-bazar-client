import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../../Loading/Loading';

const MyOrders = () => {
    const { user } = useContext(AuthContext)

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookedProduct?userEmail=${user?.email}`)
            const data = res.json()
            return data
        }
    })

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you Confirm Delete This Product')
        if (proceed) {
            fetch(`http://localhost:5000/bookedProduct?id=${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success("Delete successfully")
                        refetch()
                    }
                })
        }

    }

    if (isLoading) {
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
                        <th>Details </th>
                        <th>Delete Product</th>
                        <th>To Pay</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        bookings.length > 0 &&

                        bookings.map((product, i) =>
                            <tr key={product._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="rounded  w-20 ">
                                                <img src={product.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{product.model}</div>
                                            <div className='text-xm opacity-50'> { } </div>
                                        </div>
                                    </div>
                                </td>
                                <td>

                                    <p className='text-xm font-bold text-cyan-800 font-semibold opacity-75'> Sell Price: {product.sell}</p>
                                    <p className='text-xm font-bold'>My Location : {product.userLocation}</p>


                                </td>
                                <td>
                                    <button onClick={() => handleDelete(product._id)} className='btn btn-xs btn-secondary '>Delete</button>
                                </td>
                                <th>
                                    {
                                        product.paid ===true ?product.sell && product.paid && <span className=' font-bol p-3 bg-error rounded-xl text-white'>Paid</span>: <Link to={`/dashboard/payment/${product._id}`}> <button onClick={() => (product)} className='btn-xs btn btn-success'>TO Pay</button></Link>
                                    }

                              
                                  
                                </th>

                            </tr>)
                    }
                </tbody>

            </table>
        </div>
    );
};

export default MyOrders;