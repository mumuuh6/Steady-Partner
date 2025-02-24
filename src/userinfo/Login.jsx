import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useContext } from "react"
import { steadyContext } from "../authentication/Steadyprovider"
import { IoLogoGoogle } from "react-icons/io"
import login from '../../public/Login.json'
import Swal from "sweetalert2"
import Lottie from "lottie-react"
import useAxiosSecure from "../mainpages/hooks/useAxiosSecure"

export default function Login() {
    const {register, handleSubmit, watch} = useForm();
    const { user,loading,createuser,loginuser,logout,googleSignIn } = useContext(steadyContext)
    const nav=useNavigate()
    const axiossecure=useAxiosSecure()
    const handlegoogle = () => {
        googleSignIn()
            .then(res => {
                const userInfo={
                    email: res.user?.email,
                    displayName:res.user?.displayName,
                    photoURL:res.user?.photoURL,
                    role:"user"
                }
                axiossecure.post('/user',userInfo)
                .then(res=>{
                    console.log(res.data)
                    nav('/')
                })
            })
    }
    
    const onSubmit = (data) => {
        console.log(data)
       loginuser(data.email,data.password)
       .then(res=>{
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Logged In",
            showConfirmButton: false,
            timer: 1500
          });
          nav('/')
    })
    }
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
                                        <h1 className="text-2xl font-bold">Welcome back</h1>
                                        <p className="text-balance text-muted-foreground">
                                            Login to your Steady account
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input

                                            type="email"
                                            {...register('email')}
                                            name="email"  // The name is important for FormData to work
                                            placeholder="m@example.com"
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
                                            {...register('password')}
                                            name="password"  // The name is important for FormData to work
                                            type="password"
                                            required
                                        />
                                    </div>

                                    <Button type="submit" className="w-full">
                                        Login
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
                                    Dont have an account?{" "}
                                    <Link to={`/signup`} className="underline underline-offset-4">
                                        SignUp Now!
                                    </Link>
                                </div>
                            </div>
                            <div className="relative  flex justify-center items-center h-full">
                                <Lottie animationData={login}></Lottie>
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
