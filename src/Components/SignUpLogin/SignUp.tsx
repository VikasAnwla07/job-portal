import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { error } from "console";

const form = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT"
}

const SignUp = () => {
    const [data, setData] = useState<{[key: string]: string}>(form);
    const [formError, setFormError] = useState<{[key: string]: string}>(form);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event: any) => {
        if (typeof event == "string") {
            setData({ ...data, accountType: event });
            return;
        }

        let name = event.target.name;
        let value = event.target.value;

        setData({ ...data, [name]: value });

        // Handle password field validation
        if (name === "password") {
            // Check if confirmPassword is not empty and validate against the new password value
            if (data.confirmPassword !== "" && value !== data.confirmPassword) {
                setFormError({
                    ...formError,
                    confirmPassword: "Passwords do not match",
                    [name]: signupValidation(name, value),
                });
            } else {
                setFormError({
                    ...formError,
                    confirmPassword: "",
                    [name]: signupValidation(name, value),
                });
            }
        }

        // Handle confirmPassword field validation
        if (name === "confirmPassword") {
            if (value !== data.password) {
                setFormError({
                    ...formError,
                    confirmPassword: "Passwords do not match",
                });
            } else {
                setFormError({
                    ...formError,
                    confirmPassword: "",
                });
            }
        }

        // For other fields, validate normally
        if (name !== "password" && name !== "confirmPassword") {
            setFormError({ ...formError, [name]: signupValidation(name, value) });
        }
    };


    const handleSubmit = () => {

        let valid = true, newFormError: { [key: string]: string } = {};
        for (let key in data) {
            if (key === "accountType") continue;
            if (key !== "confirmPassword") {
                newFormError[key] = signupValidation(key, data[key]);
            } else if (data.password !== data.confirmPassword) {
                newFormError[key] = "Passwords do not m atch";
            }
            if (newFormError[key]) valid = false;

        }
        setFormError(newFormError);
        
        if (!valid) return;
        setLoading(true);
        registerUser(data).then((res) => {
            console.log(res);
            setData(form);
            successNotification('Registered Successfully', 'Redirecting to login...');
            setData(form);
            setTimeout(() => {
                setLoading(false);
                setFormError(newFormError);
                navigate("/login");
            }, 4000);

        }).catch((err) => {
            setLoading(false);
            console.log(err);
            errorNotification('Registration Failed', err.response.data.errorMessage || "Something went wrong");

        });
    }

    return (
        <>
        <LoadingOverlay
                className="!translate-x-1/2"
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'bright-sun.4', type: 'bars' }}
            />
        <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
            <div className="text-2xl font-semibold">Create An Account</div>
            <TextInput value={data.name} onChange={handleChange} error={formError.name} name="name" withAsterisk label="Full Name" placeholder="Your Name" />
            <TextInput value={data.email} onChange={handleChange} error={formError.email} name="email" withAsterisk leftSection={<IconAt size={16} />} label="Email" placeholder="Your email" />
            <PasswordInput value={data.password} onChange={handleChange} error={formError.password} name="password" withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
            <PasswordInput value={data.confirmPassword} onChange={handleChange} error={formError.confirmPassword} name="confirmPassword" withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Confirm Password" placeholder="Confirm Password" />
            <Radio.Group
                value={data.accountType}
                onChange={handleChange}
                label="You are ?"
                withAsterisk
            >
                <Group mt="xs">
                    <Radio className="py-4 px-6 border hover:bg-mine-shaft-900 border-l-mine-shaft-800 has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5  rounded-lg" autoContrast value="APPLICANT" label="Applicant" />
                    <Radio className="py-4 px-6 border hover:bg-mine-shaft-900 border-l-mine-shaft-800 has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5 rounded-lg" autoContrast value="EMPLOYER" label="Employer" />
                </Group>
            </Radio.Group>
            <Checkbox autoContrast label={<>I accept {' '}<Anchor>terms & conditions</Anchor></>} />
            <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Sign up</Button>
            <div className="mx-auto"> Have an account? <span className="text-bright-sun-400 hover:underline cursor-pointer" onClick={() => {navigate("/login");setFormError(form);setData(form)}}>Login</span></div>
        </div>
        </>
    )
}
export default SignUp;