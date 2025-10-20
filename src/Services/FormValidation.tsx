
const signupValidation = (name:string, value:string) => {
    switch (name) {
        case "name":
            if (value.length === 0) {
                return "Name is required";
            }
            
            return "";
        case "email":
            if (value.length === 0) {
                return "Email is required";
            }
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (!emailRegex.test(value)) {
                return "Invalid email format";
            }
            return "";
        case "password":
            if (value.length === 0) {
                return "Password is required";
            }
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
            if (!passwordRegex.test(value)) {
                return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
            }
            return "";
        

        default:
            return "";
    }
}

const loginValidation = (name:string, value:string) => {
    switch (name) {
        case "email":
            if (value.length === 0) {
                return "Email is required";
            } 
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (!emailRegex.test(value)) {
                return "Invalid email format";
            }
            return "";
        case "password":
            if (value.length === 0) {
                return "Password is required";
            }
            return "";
    }
}

export { signupValidation, loginValidation }