import React from 'react';
import { useRouteError } from 'react-router-dom';
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
            </div>
        </div>
    );
};

export default ErrorPage;