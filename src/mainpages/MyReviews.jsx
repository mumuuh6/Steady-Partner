import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { steadyContext } from '../authentication/Steadyprovider';
import useAxiosSecure from './hooks/useAxiosSecure';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';

const MyReviews = () => {
    const { user } = useContext(steadyContext);
    const axiossecure = useAxiosSecure();
    const [deliveryManId, setDeliveryManId] = useState('');

    // Fetch user info
    const { data: userinfos = [] } = useQuery({
        queryKey: ['email'],
        queryFn: async () => {
            const res = await axiossecure.get(`/usermail?email=${user?.email}`);
            return res.data;
        }
    });

    const userId = userinfos.length > 0 ? userinfos[0]._id : null;

    // Fetch reviews
    const { data: deliverymaninfos = [] } = useQuery({
        queryKey: ['deliveryman', userId],
        queryFn: async () => {
            if (!userId) return [];
            const res = await axiossecure.get(`/reviewmail?id=${userId}`);
            return res.data;
        },
        enabled: !!userId
    });
    console.log(deliverymaninfos)

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverymaninfos.length > 0 ? (
                deliverymaninfos.map((review) => (
                    <Card key={review._id} className="shadow-lg">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <img
                                    src={review.photo}
                                   alt={review.photo}
                                    className="w-12 h-12 rounded-full border"
                                />
                                <div>
                                    <CardTitle className="text-lg font-semibold">
                                        {review.reviewerName}
                                    </CardTitle>
                                    <p className="text-sm text-gray-500">{new Date(review.date).toDateString()}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-1 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} fill={i < review.rating ? "#FFD700" : "none"} />
                                ))}
                            </div>
                            <p className="mt-2 text-gray-700">{review.feedback}</p>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p className="text-center col-span-full text-gray-500">No reviews found</p>
            )}
        </div>
    );
};

export default MyReviews;
