import { Divider } from "@mantine/core"
import { IconAnchor } from "@tabler/icons-react";
import SignUp from "../Components/SignUpLogin/SignUp";
import Login from "../Components/SignUpLogin/Login";
import { useLocation } from "react-router-dom";

const SignUpPage = () =>{
    const location = useLocation();
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden">
            <div className={`w-[100vw] h-[99.5vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${location.pathname=='/signup'?'-translate-x-1/2':'translate-x-0'}`}>
                <Login />
                <div className={`w-1/2 h-full transition-all ease-in-out duration-1000 ${location.pathname=="/signup"?"rounded-r-[200px]":"rounded-l-[200px]"} bg-mine-shaft-900 flex items-center gap-5 justify-center flex-col `}>
                    <div className="flex gap-1 items-center text-bright-sun-400">
                        <IconAnchor className="h-16 w-16 " stroke={2.5} />
                        <div className="text-6xl font-semibold">JobHunt</div>
                    </div>
                    <div className="text-2xl text-mine-shaft-200 font-semibold"> Find Job made for you</div>
                </div>
                <SignUp />
            </div>
        </div>
    )
}
export default SignUpPage;