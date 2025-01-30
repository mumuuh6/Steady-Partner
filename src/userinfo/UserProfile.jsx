import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { useContext } from 'react';
import { steadyContext } from '../authentication/Steadyprovider';

export default function UserProfile() {
    const {user,updateProfileData}=useContext(steadyContext)
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    // Logic to update profile info goes here
    alert("Profile updated successfully!");
  };
  const photo=user?.photoURL
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-green-100 via-white to-black">
      <Card className="w-full max-w-lg p-6 shadow-lg border rounded-2xl">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center text-green-700">Your Profile</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-32 h-32">
                <AvatarImage src={user?.photoURL} alt="Profile Picture" />
            </Avatar>

            <div>
              <Label htmlFor="profile-picture" className="mb-2 font-semibold text-green-700">
                Upload Profile Picture
              </Label>
              <Input
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={handlePictureUpload}
                className="block w-full"
              />
            </div>

            <div className="w-full">
              <Label htmlFor="name" className="mb-2 font-semibold text-green-700">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={user?.displayName}
                className="block w-full"
              />
            </div>

            <div className="w-full">
              <Label htmlFor="email" className="mb-2 font-semibold text-green-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user?.email}
                
                className="block w-full"
              />
            </div>

            <Button onClick={handleUpdate} className="w-full mt-4 bg-green-700 text-white hover:bg-green-600">
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
