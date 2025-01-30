import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IoMdFemale, IoMdMan } from 'react-icons/io';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useAxiosSecure from './hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { steadyContext } from '../authentication/Steadyprovider';

const Alldeliveredparcel = () => {
    const {user}=useContext(steadyContext)
    const axiossecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 5; // Number of users per page
    // const { data: userinfos = [],refetch } = useQuery({
    //     queryKey: ['deliveryman'],
    //     queryFn: async () => {
    //         const res = await axiossecure.get(`/bookingdelivery`);
    //         return res.data;
    //     }
    // });
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
                    const res = await axiossecure.get(`/bookingdelivery?deliverymanid=${userId}`);
                    return res.data;
                },
                enabled: !!userId
            });
    const totalPages = Math.ceil(userinfos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleUsers = deliverymaninfos.slice(startIndex, endIndex);

    // Handlers for pagination
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    return (
        <div className="container mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">User List ({deliverymaninfos.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Booked User's Name</TableHead>
                                <TableHead className="text-left">Receiver's Name</TableHead>
                                <TableHead className="text-left">Booked User's Phone No</TableHead>
                                <TableHead className="text-left">Requested Delivery Date</TableHead>
                                <TableHead className="text-left">Approximate Delivery Date</TableHead>
                                <TableHead className="text-left">Receiver's Phone No</TableHead>
                                <TableHead className="text-left">Status</TableHead>
                                <TableHead className="text-left">Receiver's Address</TableHead>
                                <TableHead className="text-left">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {visibleUsers.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.receiverName}</TableCell>
                                    <TableCell>{user.phone || <p>Don't want to Share</p>}</TableCell>
                                    <TableCell>{user.deliveryDate}</TableCell>
                                    <TableCell>{user.approximatedDeliveryDate}</TableCell>
                                    <TableCell>{user.receiverPhone}</TableCell>
                                    <TableCell>{user.status}</TableCell>

                                    <TableCell>{user.deliveryAddress}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mr-2"
                                                onClick={() => {
                                                    // Logic for View Location, can be implemented with a map or another function
                                                    Swal.fire({
                                                        title: 'Location for ' + user.name,
                                                        text: 'Display map or location here.',
                                                        icon: 'info',
                                                    });
                                                }}
                                            >
                                                View Location
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mr-2"
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: 'Are you sure?',
                                                        text: 'You are about to cancel this booking.',
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonText: 'Yes, Cancel it!',
                                                        cancelButtonText: 'No, keep it',
                                                    })
                                                    .then((result) => {
                                                        if (result.isConfirmed) {
                                                            axiossecure.put(`/bookingstatus/${user._id}`,{
                                                                status: 'Cancelled',
                                                            })
                                                                .then(() => {
                                                                    refetch()
                                                                    Swal.fire('Cancelled!', 'Booking has been cancelled.', 'success');
                                                                })
                                                                .catch((error) => {
                                                                    Swal.fire('Error', 'Error canceling booking', 'error');
                                                                    console.error(error);
                                                                });
                                                        }
                                                    });
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mr-2"
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: 'Are you sure?',
                                                        text: 'You are about to mark this booking as delivered.',
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonText: 'Yes, mark as delivered!',
                                                        cancelButtonText: 'No, keep it',
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            axiossecure.put(`/bookingstatus/${user._id}`, {
                                                                status: 'Delivered',
                                                            }).then(() => {
                                                                refetch()
                                                                Swal.fire('Delivered!', 'Booking has been marked as delivered.', 'success');
                                                            }).catch((error) => {
                                                                Swal.fire('Error', 'Error marking booking as Delivered', 'error');
                                                                console.error(error);
                                                            });
                                                        }
                                                    });
                                                }}
                                            >
                                                Deliver
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            onClick={handlePrevious}
                            variant="outline"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span className="text-sm">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            onClick={handleNext}
                            variant="outline"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Alldeliveredparcel;