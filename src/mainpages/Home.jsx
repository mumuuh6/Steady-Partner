import React from 'react';
import Banner from './Banner';
import OurFeatures from './OurFeatures';
import AppStatistics from './AppStatistics';
import TopDeliveryMen from './TopDeliveryMan';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurFeatures></OurFeatures>
            <AppStatistics></AppStatistics>
            <TopDeliveryMen></TopDeliveryMen>
        </div>
    );
};

export default Home;