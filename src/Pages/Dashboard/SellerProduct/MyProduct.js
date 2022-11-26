import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../../Loading/Loading';

const MyProduct = () => {
    const {user}=useContext(AuthContext)
    console.log(user.email);
    const { data: products = [],refetch  ,isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            if(user.email){
                const res = await fetch(`http://localhost:5000/products?email=${user?.email}`)
            const data = res.json()
            return data
            }
        }
    })
    const handleProductDelete=(id)=>{
        console.log(id);
        const proceed = window.confirm('Are you Confirm Delete This Product')
        if(proceed){
            fetch(`http://localhost:5000/products/${id}`,{
            method:'DELETE',

        })
        .then(res => res.json)
                .then(data => {
                    toast.error("Delete successfully")
                    refetch()
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
                    <th>Details </th>
                    <th>Advertisement</th>

                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>

                {
                    products.length > 0 &&

                    products.map((product, i) =>
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
                                        <div className='text-xm opacity-50'> {product.useYear} years Used</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className='text-sm text-cyan-800 font-semibold  opacity-75'> Buy Price: {product.buy}</p>
                                <p className='text-sm text-cyan-800 font-semibold opacity-75'> sell Price: {product.sell}</p>
                                <p className='text-xm font-bold'>Selling  Address : {product.location}</p>

                                <div className="text-sm">{}</div>
                            </td>
                         <th>
                            <button className='btn-sm rounded-2xl btn-primary'>To Ads</button>
                         </th>
                           
                           <td>
                           <button onClick={()=>handleProductDelete(product._id)} className='btn btn-xs btn-secondary '>Delete</button>
                           </td>
                        </tr>)
                }
            </tbody>

        </table>
    </div>
    );
};

export default MyProduct;