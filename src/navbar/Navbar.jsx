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
import { IoMdNotifications } from "react-icons/io";
import Logo from '../assets/logo.jpg'
import { Link } from "react-router-dom";
import { steadyContext } from "../authentication/Steadyprovider";
import { useContext } from "react";
const Navbar = () => {
    const { user } = useContext(steadyContext)
    const Links = <>
        <MenubarMenu>
            <MenubarTrigger ><Link to={`/`}>Home</Link></MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
            <MenubarTrigger ><Link to={`/`}><IoMdNotifications></IoMdNotifications></Link></MenubarTrigger>
        </MenubarMenu>
        {user ?
            <div>
                <MenubarMenu>
                    <MenubarTrigger ><Link to={`/profile`}>name</Link></MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger ><Link to={`/logout`}>Logout</Link></MenubarTrigger>
                </MenubarMenu></div>
            :
            <>
                <MenubarMenu>
                    <MenubarTrigger ><Link to={`/login`}>Login</Link></MenubarTrigger>
                </MenubarMenu></>
        }


    </>


    return (
        <div className="flex justify-between">
            <Menubar className="flex justify-start items-center p-4 ">
                <img src={Logo} alt="" className="size-20" />
                <p className="font-bold text-lg">Steady Partner</p>
            </Menubar>
            <Menubar>
                {Links}
            </Menubar>

        </div>
    );
};

export default Navbar;