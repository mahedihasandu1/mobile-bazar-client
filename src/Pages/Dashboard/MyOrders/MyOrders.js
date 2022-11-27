import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext)

const {data:bookings=[],isLoading,refetch}=useQuery({
    queryKey:['bookings'],
    queryFn:async()=>{
        const res=await fetch(`http://localhost:5000/bookedProduct?userEmail=${user?.email}`)
        const data=res.json()
        return data
    }
})

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
                                        <div className='text-xm opacity-50'> {} </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                         
                                <p className='text-sm text-cyan-800 font-semibold opacity-75'> sell Price: {product.sell}</p>
                                <p className='text-xm font-bold'>Selling  Address : {product.location}</p>

                                
                            </td>
                            <td>
                                <button onClick={() => (product._id)} className='btn btn-xs btn-secondary '>Delete</button>
                            </td>
                            <th>
                                <button onClick={() => (product)} className='btn-xs btn btn-success'>TO Pay</button>
                            </th>
                            
                        </tr>)
                }
            </tbody>

        </table>
    </div>
    );
};

export default MyOrders;