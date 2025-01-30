import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IoMdFemale, IoMdMan } from 'react-icons/io';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useAxiosSecure from './hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Allusers = () => {
  const axiossecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 5; // Number of users per page
    const role='user'
  const { data: userinfos = [] ,refetch} = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiossecure.get(`/user`);
      return res.data;
    }
  });
const handlemakeadmin=userr=>{
  console.log(userr)
  axiossecure.patch(`/user/admin/${userr._id}`)
  .then(res=>{
    if(res.data.modifiedCount>0){
      Swal.fire({
        position:'center',
        icon:'success',
        title:`${userr.name} is admin now`,
        showConfirmButton:false,
        timer:1500,
      })
      refetch()
    }
  })
}
const handlemakedriver=userr=>{
  console.log(userr)
  axiossecure.patch(`/user/driver/${userr._id}`)
  .then(res=>{
    if(res.data.modifiedCount>0){
      Swal.fire({
        position:'center',
        icon:'success',
        title:`${userr.name} is driver now`,
        showConfirmButton:false,
        timer:1500,
      })
      refetch()
    }
  })
}
  // Pagination calculations
  const totalPages = Math.ceil(userinfos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleUsers = userinfos.slice(startIndex, endIndex);

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
          <CardTitle className="text-xl font-bold">User List ({userinfos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">ID</TableHead>
                <TableHead className="text-left">Photo</TableHead>
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-left">Email</TableHead>
                <TableHead className="text-left">Phone No</TableHead>
                <TableHead className="text-left">Number Of Parcels Booked</TableHead>
                <TableHead className="text-left">Make Admin</TableHead>
                <TableHead className="text-left">Make Delivery Man</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell><img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" /></TableCell>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone ? user.phone : <p>Don't wanna Share</p>}</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>
                    {user.role ==='admin'?'Admin':<Button onClick={()=>handlemakeadmin(user)} variant="outline" size="sm">
                      <IoMdMan />
                    </Button>}
                  </TableCell>
                  <TableCell>
                    {user.role ==='driver'?'Driver':<Button onClick={()=>handlemakedriver(user)}  variant="outline" size="sm">
                      <IoMdFemale />
                    </Button>}
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

export default Allusers;
