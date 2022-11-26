import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../Pages/Loading/Loading';

const AllProducts = () => {
    const singleData = useLoaderData();
    const { _id } = singleData;
    console.log(_id);

    const { data: products = [] ,isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/?id=${_id}`)
            const data = res.json()
            return data
        }

    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='mb-10 md:w-[80%] mx-auto'>
            <h2 className='text-center font-bold mb-10 '>Available Secondhand Device </h2>
            <div className='grid grid-cols-1 gap-5' >
                {
                    products?.map(product =>
                        <div key={product._id} className="card lg:card-side h-full bg-gray-100 shadow-xl">
                            <figure className='images'><img src={product?.image} alt="Album" /></figure>
                            <div className="card-body flex">
                            <span className='-mb-5   text-fuchsia-800 text-md font-semibold'><p>Device Model </p></span>
                                <h2 className="card-title my-3">{product.model}</h2>
                               
                                <div className="avatar">
                                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img alt='' src={product?.seller} />
                                    </div>
                                    <p className='ml-5 text-xl font-semibold'>{product?.name}</p>

                                </div>
                                <div>

                                </div>
                                <del className='text-error font-semibold italic'><p >Buy Price: ${product.buy}</p></del>
                                    <p className='text-sm font-bold'>Selling: ${product.sell}</p>
                                    <p className='text-md font-semibold text-orange-600 '>Selling Location : {product.location}</p>
                                    <p>Post Date: {product.time}</p>
                                    <p className='text-sm font-bold opacity-50'>Years of used: {product.useYear}</p>
                                <div className="card-actions items-end justify-end">
                                    <button className="btn btn-primary">Book Now</button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default AllProducts;