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
export default function Signup() {
    const { user,
        loading,
        createuser,
        loginuser,
        logout, } = useContext(steadyContext)
        const nav=useNavigate()
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        createuser(data.email, data.password)
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your account is ready to use",
                    showConfirmButton: false,
                    timer: 1500
                });
                nav('/login')
            }
            )
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden">
                        <CardContent className="grid p-0 md:grid-cols-2">
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
                                            {...register('name')}
                                            name="name"  // Correct unique name for email field
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
                                            {...register('photo')}
                                            name="photo"  // Correct unique name for email field
                                            placeholder="url only"
                                            required
                                        />
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
                                    <Button className="w-full"><Link className="flex items-center justify-center gap-2"><p>Signup with Google</p> <IoLogoGoogle></IoLogoGoogle></Link></Button>

                                    <div className="text-center text-sm">
                                        Already have an account?{" "}
                                        <Link to={`/login`} className="underline underline-offset-4">
                                            Login Now!
                                        </Link>
                                    </div>
                                </div>
                            </form>
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
