import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const AllProducts = () => {
    const singleData = useLoaderData();
    const { _id } = singleData;
    console.log(_id);

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/?id=${_id}`)
            const data = res.json()
            return data
        }

    })

    return (
        <div className='mb-10 md:w-[80%] mx-auto'>
            <h2 className='text-center font-bold mb-10 '>Available Secondhand Device </h2>
            <div className='grid grid-cols-1 gap-5' >
                {
                    products?.map(product =>
                        <div key={product._id} className="card lg:card-side h-full bg-gray-100 shadow-xl">
                            <figure className='images'><img src={product?.image} alt="Album" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.model}</h2>
                                <div className="avatar">
                                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img alt='' src={product?.seller} />
                                    </div>
                                    <p className='ml-5 text-xl font-semibold'>{product?.name}</p>
                                </div>
                                <div>

                                </div>
                                    <p>Buy Price : ${product.buy}</p>
                                    <p>Selling : ${product.sell}</p>
                                    <p>Selling : ${product.sell}</p>
                                    <p>Selling : ${product.sell}</p>
                                    <p>Selling : ${product.sell}</p>

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