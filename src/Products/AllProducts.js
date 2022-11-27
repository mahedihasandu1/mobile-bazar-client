import React from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

const AllProducts = ({ product, setProductData }) => {
    ;

    return (
        <div className="card lg:card-side h-full bg-gray-100 shadow-xl">
            <figure className='images'><img src={product?.image} alt="Album" /></figure>
            <div className="card-body flex">
                <span className='-mb-5   text-fuchsia-800 text-md font-semibold'><p>Device Model </p></span>
                <h2 className="card-title my-3">{product.model}</h2>
                <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img alt='' src={product?.seller} />
                    </div>
                    <p className='ml-5 text-xl font-semibold '>{product?.name}  {
                        product.status==='verify'  ? <CheckBadgeIcon className='w-6 text-blue-600'/> : <p>Not Verify</p>
                    }</p>
        
                </div>
                <div>
                </div>
                <del className='text-error font-semibold italic'><p >Buy Price: ${product.buy}</p></del>
                <p className='text-sm font-bold'>Selling: ${product.sell}</p>
                <p className='text-md font-semibold text-orange-600 '>Selling Location : {product.location}</p>
                <p>Post Date: {product.time}</p>
                <p className='text-sm font-bold opacity-50'>Years of used: {product.useYear}</p>
                <div className="card-actions items-end justify-end">
                    <label onClick={()=> setProductData(product)} className="btn btn-primary" htmlFor="product-booking" >Book Now</label>
                </div>
            </div>
        </div>

    );
};

export default AllProducts;