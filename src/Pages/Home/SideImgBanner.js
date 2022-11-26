import React from 'react';
import { Link } from 'react-router-dom';
import pic from '../../assets/sidebanner.jpg'

const SideImgBanner = () => {
    return (
        <div  className='grid sm:grid-cols-1 md:grid-cols-2 gap-5 my-10 sidebanner' >
            <div className='mt-44 sidebanner1 p-2'>
                <h3 className='text-3xl text-blue-700'>Best Second Hand Mobile Bazar<br />
                    For 2022</h3>
                    <div className="divider"></div> 
                    <p>Mobile Bazar is a platform on which you can buy and sell Second Hand Mobile Phones! We help people buy and sell For mobile, find properties, get jobs or recruit employees, buy and sell mobile phones, purchase electronic products, and much more. With more than 50 categories our solutions are built to be safe, smart, and convenient for our customers.</p>
                    <Link className='btn-secondary btn my-5' to='/'>Show More</Link>
        
            </div>
             <div className="">
                <img  src={pic} alt="banner"  className="max-w-lg rounded-lg shadow-2xl" />
            </div>
        </div>
    );
};

export default SideImgBanner;