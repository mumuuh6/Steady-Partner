import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IoMdFemale, IoMdMan } from 'react-icons/io';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useAxiosSecure from './hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Allparcel = () => {
    const axiossecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const role = 'driver';
    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [deliveryMan, setDeliveryMan] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const { data: userinfos = [],refetch } = useQuery({
        queryKey: ['booking'],
        queryFn: async () => {
            const res = await axiossecure.get(`/booking`);
            return res.data;
        }
    });

    const { data: deliveryMen = [] } = useQuery({
        queryKey: ['userrole'],
        queryFn: async () => {
          const res = await axiossecure.get(`/userrole?role=${role}`);
          return res.data;
        }
    });

    const totalPages = Math.ceil(userinfos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleUsers = userinfos.slice(startIndex, endIndex);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleManageClick = (bookingId) => {
        setSelectedBookingId(bookingId);
        setShowModal(true);
    };

    const handleAssign = async (bookingId) => {
        
            await axiossecure.put(`/bookingg/${bookingId}`, {
                
                deliveryManId: deliveryMan,
                
            })
            .then(res=>{
                console.log(res.data)
                Swal.fire({
                          title: "Yay! delivery man updated",
                          width: 600,
                          icon: 'success',
                          padding: "3em",
                          color: "#0B6623",
                          background: `#fff`,
                        });
                        refetch()
            })
            
            
            setShowModal(false);
       
    };
console.log(deliveryMan)
    return (
        <div className="container mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">User List ({userinfos.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Name</TableHead>
                                <TableHead className="text-left">Phone</TableHead>
                                <TableHead className="text-left">Booking date</TableHead>
                                <TableHead className="text-left">Requested Delivery date</TableHead>
                                <TableHead className="text-left">Cost</TableHead>
                                <TableHead className="text-left">Status</TableHead>
                                <TableHead className="text-left">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {visibleUsers.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.phone || <p>Don't want to Share</p>}</TableCell>
                                    <TableCell>{user.bookingDate}</TableCell>
                                    <TableCell>{user.deliveryDate}</TableCell>
                                    <TableCell>{user.price}</TableCell>
                                    <TableCell>{user.status}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mr-2"
                                            onClick={() => handleManageClick(user._id)}
                                        >
                                            Manage
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Assign Delivery Man</h3>
                        <label>Select Delivery Man:</label>
                        <select onChange={(e) => setDeliveryMan(e.target.value)} value={deliveryMan}>
                            <option value="">Select Delivery Man</option>
                            {deliveryMen.map((man) => (
                                <option key={man._id} value={man._id}>
                                    {man._id}
                                </option>
                            ))}
                        </select>
                        <br />
                        <label>Approximate Delivery Date:</label>
                        <input
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                        />
                        <br />
                        <Button onClick={() => handleAssign(selectedBookingId,deliveryMan)}>Assign</Button>
                        <Button onClick={() => setShowModal(false)}>Cancel</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Allparcel;
