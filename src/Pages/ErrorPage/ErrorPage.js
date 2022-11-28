import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import image from '../../assets/error.png'

const ErrorPage = () => {
    const error=useRouteError()
    return (
        <div style={{background:`url(${image})`}}>
            <div className=' md:py-80 '>
            <p className='text-red-600 text-center font-semibold text-4xl mt-10 pt-10'>Somethings Went Wrong.... </p>
            <p className='text-red-600 text-center font-semibold text-4xl mt-5 '>
                <i>{error.statusText || error.message}</i>
            </p>
            <p className='text-center my-10 text-3xl'> <strong>Go To Home</strong> <Link className='btn-primary btn' to='/'>Home</Link></p>
            </div>
        </div>
    );
};

export default ErrorPage;