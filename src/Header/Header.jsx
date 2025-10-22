import { Avatar, Button, Indicator } from "@mantine/core";
import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import NotiMenu from "./NotiMenu";

const Header=()=>{
     const user = useSelector((state) => state.user);
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     getProfile(user.id).then(()=>{
    //         dispatch(setProfile(res));
    //         console.log(res);
    //     }).catch((err)=>{
    //         console.error(err);
    //     })   
    // })
    const location = useLocation();
    return location.pathname!="/signup" && location.pathname!="/login" ? <div className="w-full bg-mine-shaft-950 text-bright-sun-50 h-20 flex justify-between px-6 items-center font-['poppins']">
        <div className="flex gap-1 items-center text-bright-sun-400">
            <IconAnchor className="h-8 w-8" stroke={2}/>
            <Link to={"/"}  className="text-3xl">JobHook</Link>
            </div>
            {NavLinks()}
        <div className="flex gap-3 items-center">
            {user?<ProfileMenu/>:<Link to="/login">
            <Button variant="subtle" color="brightSun.4">Login</Button>
            </Link>}
            {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
            <IconSettings stroke={1.5}/>
            </div> */}
            {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
            <Indicator processing color="red" offset={6} size={8}>
            <IconBell stroke={1.5}/>
            </Indicator>
            </div> */}

            {user?<NotiMenu/>:<></>}
            
        </div>
    </div>:<></>

}
export default Header;