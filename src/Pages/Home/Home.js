import React from 'react';
import Carusel from './Carusel';
import Category from './Category/Category';
import SideImgBanner from './SideImgBanner';

const Home = () => {
    return (
        <div>
            <SideImgBanner></SideImgBanner>
            <Carusel></Carusel>
            <Category></Category>
            <h1>this is home</h1>
        </div>
    );
};

export default Home;