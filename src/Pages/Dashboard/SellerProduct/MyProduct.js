import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../../Loading/Loading';

const MyProduct = () => {
    const navigate=useNavigate()
    const { user } = useContext(AuthContext)
    // console.log(user.email);
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            if (user.email) {
                const res = await fetch(`https://mobile-bazar-server-mahedihasandu1.vercel.app/products?email=${user?.email}`)
                const data = res.json()
                return data
            }
        }
    })
    const handleProductAds = (product) => {
        const adds = {
            name: product.name,
            email: product.email,
            seller: product.seller,
            image: product.image,
            model: product.model,
            uniqId:product._id,
            phone: product.phone,
            condition:product.condition,
            location: product.location,
            buy:product.buy,
            sell:product.sell,
            useYear: product.useYear,
            time: product.time
        }
        // console.log(adds);
        fetch('https://mobile-bazar-server-mahedihasandu1.vercel.app/adsProducts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
                 
            },
            body: JSON.stringify(adds)
        }).then(res=>res.json())
        .then(data => {
            // console.log(data)
            if (data.acknowledged === true) {
                toast.success('Advertisement Set Successful')
               navigate('/')

                refetch()
            }
            else{
                toast.error(`Your Advertisement Already Set`)
            }
           
        })
        .catch(error => console.log(error))
    }
    const handleProductDelete = (id) => {
        console.log(id);
        const proceed = window.confirm('Are you Confirm Delete This Product')
        if (proceed) {
            fetch(`https://mobile-bazar-server-mahedihasandu1.vercel.app/products/${id}`, {
                method: 'DELETE',
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }

            })
                .then(res => res.json())
                .then(data => {
                    if(data.deletedCount >0){
                        toast.success("Delete successfully") 
                        fetch(`https://mobile-bazar-server-mahedihasandu1.vercel.app/adsProducts?id=${id}`,{
                    method:'DELETE',
                    headers:{
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                   }).then(res=>res.json())
                   .then(()=>{
                    refetch()
                   })      
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

                                    <div className="text-sm">{ }</div>
                                </td>
                                <th>
                                    <button onClick={() => handleProductAds(product)} className='btn-sm rounded-2xl btn-primary'>To Ads</button>
                                </th>

                                <td>
                                    <button onClick={() => handleProductDelete(product._id)} className='btn btn-xs btn-secondary '>Delete</button>
                                </td>
                            </tr>)
                    }
                </tbody>

            </table>
        </div>
    );
};

export default MyProduct;