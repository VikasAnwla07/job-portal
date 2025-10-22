import {
  Button,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { loginUser } from "../Services/UserService";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import ResetPassword from "./ResetPassword";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";
import { changeProfile } from "../Slices/ProfileSlice";
import { getProfile } from "../Services/ProfileService";
import { loginUser } from "../Services/AuthService";
import { setJwt } from "../Slices/JwtSlice";
import { jwtDecode } from "jwt-decode";
const form = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState(form);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    let valid = true,
      newFormError = {};

    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }

    setFormError(newFormError);

    if (valid) {
    setLoading(true);

    loginUser(data)
      .then(async (res) => {
        console.log(res); // res = backend response JSON

        // Save JWT
        dispatch(setJwt(res.jwt));
        localStorage.setItem("jwt", res.jwt);

        // Decode JWT to get user ID
        const decoded = jwtDecode(res.jwt);
        const userId = decoded.userId || decoded.id || decoded.sub; // depends on your JWT payload

        // Fetch profile
        const profile = await getProfile(userId);
        dispatch(changeProfile(profile));
        dispatch(setUser({ ...decoded, email: decoded.sub }));

        notifications.show({
          title: "Login Successfully",
          message: "Redirecting to home page...",
          icon: <IconCheck />,
          color: "teal",
        });

        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        notifications.show({
          title: "Login Failed",
          message: err.response?.data?.errorMessage || "Login failed",
          icon: <IconX />,
          color: "red",
        });
      });
  }
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Create Account</div>
        <TextInput
          value={data.email}
          name="email"
          error={formError.email}
          onChange={handleChange}
          leftSection={<IconAt size={16} />}
          label="Email"
          placeholder="Your email"
        />
        <PasswordInput
          value={data.password}
          name="password"
          error={formError.password}
          onChange={handleChange}
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Password"
          placeholder="Password"
        />
        <Button
          loading={loading}
          onClick={handleSubmit}
          autoContrast
          variant="filled"
        >
          Login
        </Button>
        <div className="mx-auto">
          Don't have an account?{" "}
          <span
            className="text-bright-sun-400 hover:underline cursor-pointer"
            onClick={() => {
              navigate("/signup");
              setFormError(form);
              setData(form);
            }}
          >
            SignUp
          </span>
        </div>
        <div
          onClick={open}
          className="text-bright-sun-400 hover:underline text-center cursor-pointer"
        >
          Forget Password?
        </div>
      </div>
      <ResetPassword opened={opened} close={close} />
    </>
  );
};
export default Login;
