import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import useAxiosSecure from './hooks/useAxiosSecure';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Adminstatistics = () => {
    const axiosSecure = useAxiosSecure();
    const [chartData, setChartData] = useState({
        categories: [],
        series: []
    });

    useEffect(() => {
        axiosSecure.get('/booking')
            .then(response => {
                const bookings = response.data;
                const bookingsByDate = {};

                bookings.forEach(booking => {
                    const date = new Date(booking.bookingDate).toLocaleDateString();
                    bookingsByDate[date] = (bookingsByDate[date] || 0) + 1;
                });

                const categories = Object.keys(bookingsByDate);
                const seriesData = Object.values(bookingsByDate);

                setChartData({
                    categories,
                    series: [{ name: 'Bookings', data: seriesData }]
                });
            })
            .catch(error => console.error('Error fetching bookings data:', error));
    }, [axiosSecure]);

    const barChartOptions = {
        chart: { type: 'bar' },
        xaxis: { categories: chartData.categories },
        title: { text: 'Bookings by Date' }
    };
    
    return (
        <div className="container mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                    <Chart options={barChartOptions} className='bg-green-200 ' series={chartData.series} type="bar" height={350} />
                </CardContent>
            </Card>
        </div>
    );
};

export default Adminstatistics;