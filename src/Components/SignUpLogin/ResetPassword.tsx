import { Button, Modal, PasswordInput, PinInput, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

const ResetPassword = (props: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passError, setPassError] = useState("");
    const [otpSent, setOtpSent] = useState(false)
    const [otpSending, setOtpSending] = useState(false)
    const [otpVerified, setOtpVerified] = useState(false)
    const [resendLoader, setResendLoader] = useState(false)
     const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
      if (seconds ===0){
        setResendLoader(false);
        setSeconds(60);
        interval.stop();
      }
      setSeconds((s) => s - 1);
  }, 1000);


    const handleSendOtp = () => {
        setOtpSending(true);
        sendOtp(email).then((res) => {
            console.log(res);
            successNotification('OTP Sent Successfully', 'Enter OTP to reset your password');
            setOtpSent(true);
            setOtpSending(false);
            setResendLoader(true);
            interval.start();
        }).catch((error) => {
            console.log(error);
            errorNotification('OTP Sending Failed', error.response?.data?.errorMessage || "Something went wrong");
            setOtpSending(false);
        });

    }

    const handleVerifyOtp = (otp: string) => {
        verifyOtp(email, otp).then((res) => {
            console.log(res);
            successNotification('OTP Verified Successfully', 'You can now reset your password');
            setOtpVerified(true);
        }).catch((error) => {
            console.log(error);
            errorNotification('OTP Verification Failed', error.response?.data?.errorMessage || "Something went wrong");
        });

    }

    const handleResendOtp = () => {
        if(resendLoader) return;
        handleSendOtp();
    }
    const handleChangeEmail = () => {
        setOtpSent(false);
        setEmail("");
        setResendLoader(false);
        setSeconds(60);
        setOtpVerified(false);
        interval.stop();
    }

    const handleResetPassword = () => {
        changePass(email, password).then((res) => {
            console.log(res);
            successNotification('Password Reset Successful', 'You can now login with your new password');
            props.close();
        }).catch((error) => {
            console.log(error);
            errorNotification('Password Reset Failed', error.response?.data?.errorMessage || "Something went wrong");
        });

    }

    return (
        <Modal opened={props.opened} onClose={props.close} title="Reset Password">
            <div className="flex flex-col gap-6">
                <TextInput value={email} size="md" name="email" onChange={(e) => setEmail(e.target.value)} withAsterisk leftSection={<IconAt size={16} />} label="Email" placeholder="Your email" rightSection={<Button loading={otpSending} size="xs" className="mr-1" onClick={handleSendOtp} autoContrast disabled={!email || otpSent} variant="filled">Send OTP</Button>} rightSectionWidth="xl" />

                {otpSent && <PinInput onComplete={handleVerifyOtp} length={6} className="mx-auto" size="md" gap="lg" type="number" />}

                {otpSent && !otpVerified &&
                    <div className="flex gap-2" >
                        <Button loading={otpSending  && !otpSent} fullWidth color="bright-sun.4" onClick={handleResendOtp} autoContrast variant="light">{resendLoader ? `Resending... (${seconds})` : "Resend OTP"}</Button>
                        <Button loading={otpSending} fullWidth onClick={handleChangeEmail} autoContrast variant="filled">Change Email</Button>

                    </div>
                }

                {otpVerified &&
                    <PasswordInput value={password} error={passError} name="password" onChange={(e) => { setPassword(e.target.value); setPassError(signupValidation("password", e.target.value)) }} withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
                }

                {otpVerified &&
                    <Button onClick={handleResetPassword} autoContrast variant="filled">Change Password</Button>
                }

            </div>

        </Modal>
    )
}
export default ResetPassword;