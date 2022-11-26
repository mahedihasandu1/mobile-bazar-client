import React from 'react';
import Advertisement from './Ads/Advertisement';
import Carusel from './Carusel';
import Category from './Category/Category';
import SideImgBanner from './SideImgBanner';

const Home = () => {
    return (
        <div>
            <SideImgBanner></SideImgBanner>
            <Advertisement></Advertisement>
            <Carusel></Carusel>
             <h1 className='text-center font-bold text-3xl my-16 italic text-orange-600'>Available Product category</h1>
            <Category></Category>

        </div>
    );
};

export default Home;