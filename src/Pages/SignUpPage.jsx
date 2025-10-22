import { Button, Divider } from "@mantine/core";
import { IconAnchor, IconArrowLeft } from "@tabler/icons-react";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4 overflow-hidden relative">
      <Button
        onClick={() => navigate("/")}
        my="md"
        className="!absolute left-5 z-10"
        leftSection={<IconArrowLeft size={20} />}
        color="brightSun.4"
        variant="light"
      >
        Home
      </Button>
      <div
        className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${
          location.pathname == "/signup" ? "-translate-x-1/2" : "translate-x-0"
        }`}
      >
        <Login />
        <div
          className={`w-1/2 h-full transition-all ease-in-out duration-1000 ${
            location.pathname == "/signup"
              ? "rounded-r-[250px]"
              : "rounded-l-[250px]"
          } bg-mine-shaft-900 flex flex-col items-center justify-center gap-5`}
        >
          <div className="flex gap-1 items-center text-bright-sun-400">
            <IconAnchor className="h-16 w-16" stroke={2} />
            <div className="text-6xl">JobHook</div>
          </div>
          <div className="text-2xl text-mine-shaft-200 font-semibold">
            Find the job made for you
          </div>
        </div>
        <SignUp />
      </div>
    </div>
  );
};
export default SignUpPage;
