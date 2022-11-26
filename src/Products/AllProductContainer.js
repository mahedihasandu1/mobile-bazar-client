import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../Pages/Loading/Loading';
import AllProducts from './AllProducts';
import BookingModal from './BookingModal/BookingModal';

const AllProductContainer = () => {
    const [productData,setProductData]=useState(null)
    const singleData = useLoaderData();
    const { _id } = singleData;
    console.log(_id);

    const { data: products = [], isLoading,refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/?id=${_id}`)
            const data = res.json()
            return data
        }

    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section>
            <div>
            <div className='mb-10 md:w-[80%] mx-auto'>
            <h2 className='text-center font-bold mb-10 '>Available Secondhand Device </h2>
            <div className='grid grid-cols-1 gap-5' ></div>
            {
                products.map(product=><AllProducts key={product._id} 
                product={product}
                setProductData={setProductData}
                ></AllProducts>)
            }
            </div>
        </div>
        {
                productData && 
                <BookingModal
                productData={productData}
                setProductData={setProductData}
                refetch={refetch}
                >
                </BookingModal>
            }
        </section>
        
    );
};

export default AllProductContainer;