import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { steadyContext } from "../authentication/Steadyprovider";
import Swal from "sweetalert2";
import { IoLogoGoogle } from "react-icons/io";
import Register from '../../public/register.json'
import Lottie from "lottie-react";
import useAxiosSecure from "../mainpages/hooks/useAxiosSecure";
export default function Signup() {
    const { user,
        loading,
        createuser,
        loginuser,
        logout, updateProfileData,
        googleSignIn, } = useContext(steadyContext)
    const nav = useNavigate()
    const { register, handleSubmit } = useForm();
    const handlegoogle = () => {
        googleSignIn()
            .then(res => {
                const userInfo = {
                    email: res.user?.email,
                    displayName: res.user?.displayName,
                    photoURL: res.user?.photoURL,
                    role:'user'
                }
                axiossecure.post('/user', userInfo)
                    .then(res => {
                        console.log(res.data)
                        nav('/')
                    })
            })
    }
    const axiossecure = useAxiosSecure()
    const onSubmit = (data) => {
        const { password, ...newdata } = data;


        console.log(newdata);
        createuser(data.email, data.password)
            .then(res => {
                updateProfileData({ displayName: data.displayName, photoURL: data.photoURL })
                    .then(() => {
                        axiossecure.post('/user', newdata)
                            .then(res => {
                                console.log(res.data)
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Your account is ready to use",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                nav('/login')
                            })
                            .catch(err => { console.log(err) })
                    })
                    .catch((error) => {
                        console.log("Error updating user profile:", error);
                    });


            }
            )
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden">
                        <CardContent className="grid p-0 gap-8 md:grid-cols-2">
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col items-center text-center">
                                            <h1 className="text-2xl font-bold">Hey! Join Us Fast</h1>
                                            <p className="text-balance text-muted-foreground">
                                                Signup to your Steady account
                                            </p>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Username</Label>
                                            <Input
                                                type="text"
                                                {...register('displayName')}
                                                name="displayName"  // Correct unique name for email field
                                                placeholder="Enter Your Name"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                type="email"
                                                {...register('email')}
                                                name="email"  // Correct unique name for email field
                                                placeholder="m@example.com"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Photo URL</Label>
                                            <Input
                                                type="url"
                                                {...register('photoURL')}
                                                name="photoURL"  // Correct unique name for email field
                                                placeholder="url only"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Phone number</Label>
                                            <Input
                                                type="number"
                                                {...register('phone')}
                                                name="phone"  // Correct unique name for email field
                                                placeholder="phone no"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2 mt-6">
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                            <select
                                                id="role"
                                                {...register('role')}
                                                name="role"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                required
                                            >
                                                <option value="">Select Role</option>
                                                <option value="driver">Driver</option>
                                                <option value="user">User</option>
                                            </select>
                                        </div>

                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">Password</Label>
                                                <Link
                                                    to="#"
                                                    className="ml-auto text-sm underline-offset-2 hover:underline"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <Input
                                                {...register('password')}  // Correct unique name for password field
                                                name="password"  // Unique name for password field
                                                type="password"
                                                required
                                            />
                                        </div>

                                        <Button type="submit" className="w-full">
                                            Signup
                                        </Button>
                                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                                Or continue with
                                            </span>
                                        </div>
                                    </div>
                                </form>
                                <div className="text-center text-sm p-6 md:p-8">
                                    <button onClick={handlegoogle} className="w-full rounded-lg h-9 px-4 py-2 bg-black text-white font-semibold shadow hover:bg-white hover:text-black flex items-center justify-center gap-2 mb-2"><p>Signup with Google</p> <IoLogoGoogle></IoLogoGoogle></button>
                                    Already have an account?{" "}
                                    <Link to={`/login`} className="underline underline-offset-4">
                                        Login Now!
                                    </Link>
                                </div>
                            </div>
                            <div className="relative  flex justify-center items-center h-full">
                                <Lottie animationData={Register} />
                            </div>

                        </CardContent>
                    </Card>
                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                        By clicking continue, you agree to our{" "}
                        <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link>.
                    </div>
                </div>
            </div>
        </div>
    );
}
