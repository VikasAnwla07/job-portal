import { Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/UserService";
import { useState } from "react";
import { loginValidation } from "../../Services/FormValidation";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/UserSlice";


const Login = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const form = {
        email: "",
        password: ""
    }

    const [data, setData] = useState<{ [key: string]: string }>(form);
    const [formError, setFormError] = useState<{ [key: string]: string }>(form);
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();


    const handleChange = (event: any) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }


    const handleSubmit = () => {

        let valid = true;
        let newFormError: { [key: string]: string } = {}; // Ensure all values are of type string

        // Validate each field in the data object
        for (let key in data) {
            if (key === "email" || key === "password") {
                const error = loginValidation(key, data[key]);
                newFormError[key] = error || ""; // Assign an empty string if no error
                if (error) valid = false; // If there's an error, mark the form as invalid
            }
        }

        // Update form errors and prevent submission if invalid
        setFormError(newFormError); // Now `newFormError` matches the expected type
        if (!valid) {
            return;
        }

        setLoading(true);

        // Proceed with login if validation passes
        loginUser(data).then((res) => {
            console.log(res);
            successNotification('Login Successful', 'Redirecting to home...');

            setTimeout(() => {
                setLoading(false);
                dispatch(setUser(res))
                navigate("/");
            }, 4000);
        }).catch((err) => {
            setLoading(false);
            console.log(err.response.data);
            errorNotification('Login Failed', err.response.data.errorMessage || "Something went wrong");
            // Clear fields after failed login
            setData(form);
            setFormError(form);
        });
    };


    return (
        <>
            <LoadingOverlay
                
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'bright-sun.4', type: 'bars' }}
            />
            <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
                <div className="text-2xl font-semibold">Already have an Account</div>
                <TextInput value={data.email} error={formError.email} onChange={handleChange} name="email" withAsterisk leftSection={<IconAt size={16} />} label="Email" placeholder="Your email" />
                <PasswordInput value={data.password} error={formError.password} onChange={handleChange} name="password" withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
                <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Login</Button>
                <div className="mx-auto"> Don't have an account? <span className="text-bright-sun-400 hover:underline cursor-pointer" onClick={() => { navigate("/signup"); setFormError(form); setData(form) }}>Sign up</span></div>

                <div onClick={open} className="text-bright-sun-400 hover:underline cursor-pointer text-center" >Forget Password</div>
            </div>
            <ResetPassword opened={opened} close={close} />
        </>
    )
}
export default Login;