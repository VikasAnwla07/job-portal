import { Button, Indicator } from "@mantine/core";
import { IconAnchor, IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";

const Header = () => {
    const user = useSelector((state:any)=>state.user);
    const location = useLocation();
  return ( location.pathname!="/signup" && location.pathname!="/login" ? 
    <div className="w-full text-white px-6 bg-mine-shaft-950 h-20 flex justify-between items-center font-['Poppins']">
        <div className="flex gap-2 items-center text-bright-sun-400">
            <IconAnchor className="h-8 w-8 stroke={2.5}"/>
            <div className="text-3xl items-center font-semibold">JobHunt</div>
        </div>

        {NavLinks()}
        
        <div className="flex gap-3 items-center">
            {user ? <ProfileMenu /> : 
                <Link to="/login">
                    <Button color="bright-sun.4" variant="subtle">Login</Button>
                </Link>
            }
            {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
                <IconSettings  stroke={1.5}/>
            </div> */}
            <div className="bg-mine-shaft-900 p-1.5 rounded-full">
                <Indicator offset={6} color="bright-sun.5" size={8} processing>
                    <IconBell stroke={1.5} />
                </Indicator>
            </div>
        </div>
    </div> : <></>
  )
};

export default Header;