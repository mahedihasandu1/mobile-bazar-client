import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const Products = () => {


    const { data: products = [],refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products')
            const data = res.json()
            return data
        }

    })
    const handleDelete=(id)=>{
        const proceed = window.confirm('Are you Confirm Delete This Product')
        if(proceed){
            fetch(`http://localhost:5000/products/${id}`,{
            method:'DELETE',

        })
        .then(res => res.json)
                .then(data => {
                    toast.success("Delete successfully")
                    refetch()
                })
        }

    }


    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">

                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>Device Info</th>
                        <th>seller</th>
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
                                            <div className="mask mask-squircle w-10 h-10">
                                                <img src={product.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{product.model}</div>
                                        </div>
                                    </div>
                                </td>
                                <th>
                                    {product.name}
                                    <br />
                                    <span className='text-sm opacity-60'> {product.email}</span>
                                </th>
                                
                                <td><button onClick={()=>handleDelete(product._id)} className='btn btn-xs btn-secondary '>Delete</button></td>
                            </tr>)
                    }
                </tbody>

            </table>
        </div>
    );
};

export default Products;