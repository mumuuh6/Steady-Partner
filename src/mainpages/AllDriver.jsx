import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IoMdFemale, IoMdMan } from 'react-icons/io';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useAxiosSecure from './hooks/useAxiosSecure';

const AllDriver = () => {
const axiossecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 5; // Number of users per page
    const role='driver'
  const { data: userinfos = [] } = useQuery({
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
                       
                       <TableHead className="text-left">Name</TableHead>
                       <TableHead className="text-left">Email</TableHead>
                       <TableHead className="text-left">Phone No</TableHead>
                       <TableHead className="text-left">Number Of Parcels Delivered</TableHead>
                       
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {visibleUsers.map((user, index) => (
                       <TableRow key={user.id}>
                         
                         
                         <TableCell>{user.displayName}</TableCell>
                         <TableCell>{user.email}</TableCell>
                         <TableCell>{user.phone ? user.phone : <p>Don't wanna Share</p>}</TableCell>
                         <TableCell>0</TableCell>
                         
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

export default AllDriver;