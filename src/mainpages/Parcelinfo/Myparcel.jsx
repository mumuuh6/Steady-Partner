import React, { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { steadyContext } from '../../authentication/Steadyprovider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Myparcel = () => {
  const axiossecure = useAxiosSecure();
  const { user } = useContext(steadyContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: userinfos = [], refetch } = useQuery({
    queryKey: ['booking'],
    queryFn: async () => {
      const res = await axiossecure.get(`/bookingmail?email=${user?.email}`);
      return res.data;
    }
  });
  console.log(userinfos)
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

  const handleReview = (parcel) => {
    
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };
console.log(user)
  const handleCancel = async (_id) => {
    try {
      const response = await axiossecure.delete(`/booking/${_id}`);
      if (response.status === 200) {
        Swal.fire('Cancelled', 'Your parcel has been deleted.', 'success');
        refetch();
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to cancel the parcel', 'error');
    }
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiossecure.post('/review', data);
      Swal.fire('Review Submitted', 'Your review has been added successfully', 'success');
      setIsModalOpen(false);
      reset();
    } catch (error) {
      Swal.fire('Error', 'Internal server error', 'error');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">My Parcels ({userinfos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Parcel Type</TableHead>
                <TableHead>Requested Delivery Date</TableHead>
                <TableHead>Approximate Delivery Date</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Delivery Men ID</TableHead>
                <TableHead>Booking Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleUsers.map((parcel, index) => (
                <TableRow key={parcel._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{parcel.parcelType}</TableCell>
                  <TableCell>{parcel.deliveryDate}</TableCell>
                  <TableCell>{parcel.approximatedDeliveryDate}</TableCell>
                  <TableCell>{parcel.bookingDate}</TableCell>
                  <TableCell>{parcel.deliveryManId || 'Not Assigned Yet'}</TableCell>
                  <TableCell>{parcel.status}</TableCell>
                  <TableCell>
                    {parcel.status !== 'Delivered' && (
                      <>
                        <Link to={`/updatepage/${parcel._id}`}>
                          <Button variant="outline" size="sm" disabled={parcel.status !== 'pending'}>Update</Button>
                        </Link>
                        <Button onClick={() => handleCancel(parcel._id)} variant="outline" size="sm" disabled={parcel.status !== 'pending'}>Cancel</Button>
                      </>
                    )}
                    {parcel.status === 'Delivered' && <Button variant="outline" size="sm" onClick={() => handleReview(parcel)}>Review</Button>}
                    {parcel.status === 'Delivered' && <Button variant="outline" size="sm">Pay</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Button onClick={handlePrevious} variant="outline" disabled={currentPage === 1}>Previous</Button>
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <Button onClick={handleNext} variant="outline" disabled={currentPage === totalPages}>Next</Button>
          </div>
        </CardContent>
      </Card>
      {/* Review Modal */}
      {isModalOpen && selectedParcel && (
        <Dialog
          open={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) setSelectedParcel(null);
          }}
          modal={true} // Ensures the modal traps focus
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit a Review</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input type="text" {...register('name')} defaultValue={user?.displayName} readOnly className="w-full p-2 border rounded" />
              <input type="text" {...register('photo')} defaultValue={user?.photoURL} readOnly className="w-full p-2 border rounded" />
              <input
                type="number"
                {...register('rating')}
                min="1" max="5"
                placeholder="Rating (1-5)"
                className="w-full p-2 border rounded"
                required
                autoFocus // Ensures first input is focused properly
              />
              <textarea {...register('feedback')} placeholder="Your feedback" className="w-full p-2 border rounded" required></textarea>
              <input type="text" {...register('deliveryManId')} defaultValue={selectedParcel.deliveryManId} readOnly className="w-full p-2 border rounded" />
              <Button type="submit">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Myparcel;
