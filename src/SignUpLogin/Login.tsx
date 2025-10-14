import { Button, PasswordInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Login=()=>{
    return (
        <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
            <div className="text-2xl font-semibold">Already have an Account</div>
            <TextInput withAsterisk leftSection={<IconAt size={16} />} label="Email" placeholder="Your email"/>
            <PasswordInput withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
            <Button autoContrast variant="filled">Login</Button>
            <div className="mx-auto"> Don't have an account? <Link className="text-bright-sun-400 hover:underline" to="/signup">Sign up</Link></div>
        </div>
    )
}
export default Login;