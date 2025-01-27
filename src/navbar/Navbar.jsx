import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { IoMdNotifications } from "react-icons/io";
import Logo from '../assets/logo.jpg'
import { Link } from "react-router-dom";
import { steadyContext } from "../authentication/Steadyprovider";
import { useContext } from "react";

const Navbar = () => {

    const { user, loading, createuser, loginuser, logout, } = useContext(steadyContext);
    const handlelogout = () => {
        logout()
            .then(res => { console.log('successful logout') })
            .catch(err => { console.log(err) })
    }

    const Links = <>
        <MenubarMenu>
            <MenubarTrigger ><Link to={`/`} className="bg-black text-white shadow rounded-xl hover:bg-white hover:text-black h-9 px-4 py-2">Home</Link></MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger ><Link to={`/`} className="bg-black text-white shadow rounded-xl hover:bg-white hover:text-black h-9 px-4 py-2 flex items-center"><IoMdNotifications></IoMdNotifications></Link></MenubarTrigger>
        </MenubarMenu>
        {
            user ?
                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                    <AvatarImage src={user.photoURL}  />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User />
                                    <span>{user.displayName}</span>
                                   
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CreditCard />
                                    <span>Dashboard</span>
                                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem>
                                <LogOut />
                                <button onClick={handlelogout}>Logout</button>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                :
                <>
                    <MenubarMenu>
                        <MenubarTrigger ><Link to={`/login`} className="bg-black text-white shadow rounded-xl hover:bg-white hover:text-black h-9 px-4 py-2">Login</Link></MenubarTrigger>
                    </MenubarMenu></>
        }


    </>
    console.log(user)

    return (
        <div className="h-11 flex justify-between lg:h-16 py-3">
            <Menubar className="flex justify-start items-center p-4 ">
                <img src={Logo} alt="" className="size-10 lg:size-20" />
                <p className="font-bold text-lg">Steady Partner</p>
            </Menubar>
            <Menubar>
                {Links}
            </Menubar>

        </div>
    );
};

export default Navbar;