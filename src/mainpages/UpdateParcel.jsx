import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { steadyContext } from "../authentication/Steadyprovider";
import Lottie from "lottie-react";
import booking from "../../public/booking.json";
import useAxiosSecure from "./hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import bg from '../assets/bg.jpg'
import { useNavigate, useParams } from "react-router-dom";

const UpdateParcel = () => {
  const {id}=useParams();
  
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [price, setPrice] = useState(0);
  const { user } = useContext(steadyContext);
  const nav = useNavigate()
  // Watch parcel weight to auto-calculate the price
  const parcelWeight = watch("parcelWeight");
  useEffect(() => {
    if (parcelWeight <= 1) setPrice(50);
    else if (parcelWeight <= 2) setPrice(100);
    else setPrice(150);
  }, [parcelWeight]);

  const Axiossecure = useAxiosSecure();

  const onSubmit = (data) => {
    console.log(data);

    // Automatically generate the current date
    const currentDate = new Date().toISOString().split('T')[0];  // YYYY-MM-DD format

    // Calculate the approximated delivery date (3 days after the requested delivery date)
    const deliveryDate = new Date(data.deliveryDate);
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const approximatedDeliveryDate = deliveryDate.toISOString().split('T')[0];  // YYYY-MM-DD format

    const bookingData = {
      ...data,
      price,
      status: "pending",  // Default status
      bookingDate: currentDate,  // Booking date is set to today's date
      approximatedDeliveryDate,
      deliverymanid: 'unassigned'  // Add approximated delivery date
    };

    console.log(bookingData);

    Axiossecure.put(`/booking/${id}`, bookingData)
      .then(res => {
        console.log(bookingData,res.data)
        Swal.fire({
          title: "Yay! Parcel updated",
          width: 600,
          icon: 'success',
          padding: "3em",
          color: "#0B6623",
          background: `#fff`,
        });

        reset();
        // Reset form after submission
        nav('/myparcel')
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 border-2 border-green-700 border-dashed p-6 rounded-lg">
      {/* Lottie Animation Placeholder */}
      <div className="flex justify-center mb-4">
        <div className="h-32 w-32 bg-gray-200 rounded-full flex items-center justify-center">
          <Lottie animationData={booking}></Lottie>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Update a Parcel</h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Information */}
        <div className="col-span-full grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            defaultValue={user?.displayName}
            {...register("name")}
            readOnly
            className="cursor-not-allowed bg-gray-100 focus:ring focus:ring-green-500"
          />
        </div>
        <div className="col-span-full grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={user?.email}
            {...register("email")}
            readOnly
            className="cursor-not-allowed bg-gray-100 focus:ring focus:ring-green-500"
          />
        </div>

        {/* Phone Number */}
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            placeholder="Enter your phone number"
            className="focus:ring focus:ring-green-500"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        {/* Parcel Type */}
        <div className="grid gap-2">
          <Label htmlFor="parcelType">Parcel Type</Label>
          <select
            id="parcelType"
            {...register("parcelType", { required: "Parcel type is required" })}
            className="border-gray-300 rounded-md focus:ring focus:ring-green-500"
          >
            <option value="">Select Parcel Type</option>
            <option value="Document">Document</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
            <option value="Other">Other</option>
          </select>
          {errors.parcelType && <p className="text-red-500">{errors.parcelType.message}</p>}
        </div>

        {/* Parcel Weight */}
        <div className="grid gap-2">
          <Label htmlFor="parcelWeight">Parcel Weight (kg)</Label>
          <Input
            id="parcelWeight"
            type="number"
            {...register("parcelWeight", { required: "Parcel weight is required", min: 0 })}
            placeholder="Enter parcel weight"
            className="focus:ring focus:ring-green-500"
          />
          {errors.parcelWeight && <p className="text-red-500">{errors.parcelWeight.message}</p>}
        </div>

        {/* Receiver's Name */}
        <div className="grid gap-2">
          <Label htmlFor="receiverName">Receiver’s Name</Label>
          <Input
            id="receiverName"
            type="text"
            {...register("receiverName", { required: "Receiver’s name is required" })}
            placeholder="Enter receiver’s name"
            className="focus:ring focus:ring-green-500"
          />
          {errors.receiverName && <p className="text-red-500">{errors.receiverName.message}</p>}
        </div>

        {/* Receiver's Phone */}
        <div className="grid gap-2">
          <Label htmlFor="receiverPhone">Receiver's Phone Number</Label>
          <Input
            id="receiverPhone"
            type="tel"
            {...register("receiverPhone", { required: "Receiver’s phone number is required" })}
            placeholder="Enter receiver’s phone number"
            className="focus:ring focus:ring-green-500"
          />
          {errors.receiverPhone && <p className="text-red-500">{errors.receiverPhone.message}</p>}
        </div>

        {/* Delivery Address */}
        <div className="col-span-full grid gap-2">
          <Label htmlFor="deliveryAddress">Parcel Delivery Address</Label>
          <Textarea
            id="deliveryAddress"
            {...register("deliveryAddress", { required: "Delivery address is required" })}
            placeholder="Enter delivery address"
            className="focus:ring focus:ring-green-500"
          />
          {errors.deliveryAddress && <p className="text-red-500">{errors.deliveryAddress.message}</p>}
        </div>

        {/* Requested Delivery Date */}
        <div className="grid gap-2">
          <Label htmlFor="deliveryDate">Requested Delivery Date</Label>
          <Input
            id="deliveryDate"
            type="date"
            {...register("deliveryDate", { required: "Delivery date is required" })}
            className="focus:ring focus:ring-green-500"
          />
          {errors.deliveryDate && <p className="text-red-500">{errors.deliveryDate.message}</p>}
        </div>

        {/* Latitude */}
        <div className="grid gap-2">
          <Label htmlFor="latitude">Delivery Address Latitude</Label>
          <Input
            id="latitude"
            type="number"
            step="0.000001"
            {...register("latitude", { required: "Latitude is required" })}
            placeholder="Enter latitude"
            className="focus:ring focus:ring-green-500"
          />
          {errors.latitude && <p className="text-red-500">{errors.latitude.message}</p>}
        </div>

        {/* Longitude */}
        <div className="grid gap-2">
          <Label htmlFor="longitude">Delivery Address Longitude</Label>
          <Input
            id="longitude"
            type="number"
            step="0.000001"
            {...register("longitude", { required: "Longitude is required" })}
            placeholder="Enter longitude"
            className="focus:ring focus:ring-green-500"
          />
          {errors.longitude && <p className="text-red-500">{errors.longitude.message}</p>}
        </div>

        {/* Price */}
        <div className="grid gap-2">
          <Label>Price (Tk)</Label>
          <Input
            type="text"
            value={price}
            readOnly
            className="cursor-not-allowed bg-gray-100 focus:ring focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <Button type="submit" className="w-full">
            Book
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateParcel;