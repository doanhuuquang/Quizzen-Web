import { APP_PATHS } from "@/lib/constants/app-paths";
import ResetPasswordRequest from "@/lib/dtos/requests/reset-password-request";
import ApiErrorResponseSchema from "@/lib/schemas/api-response-schemas/api-error-response-schema";
import SendOTPToEmailRequestSchema from "@/lib/schemas/auth-schemas/send-otp-to-email-request-schema copy";
import VerifyOTPRequestSchema from "@/lib/schemas/auth-schemas/verify-otp-schema";
import { resetPassword } from "@/services/account-services";
import { send, verify } from "@/services/otp-services";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function useResetPassword() {
  const t = useTranslations("Errors");

  const [email, setEmail] = useState<string>("");
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );
  const [resetPasswordToken, setResetPasswordToken] = useState<string | null>(
    null
  );
  const [cooldown, setCooldown] = useState<number>(0);
  const [isSendingOTP, setIsSendingOTP] = useState<boolean>(false);
  const [isSentOTP, setIsSentOTP] = useState<boolean>(false);
  const [isVerifiedOTP, setIsVerifiedOTP] = useState<boolean>(false);
  const [isCheckingOtp, setIsCheckingOtp] = useState<boolean>(false);
  const [isResettingPassword, setIsResettingPassword] =
    useState<boolean>(false);

  const sendOTP = async (data: SendOTPToEmailRequestSchema) => {
    try {
      setIsSendingOTP(true);
      setResetPasswordError(null);
      setIsSentOTP(false);

      await send(data);

      setIsSentOTP(true);
      setCooldown(60);
    } catch (e) {
      const err = e as ApiErrorResponseSchema;
      setResetPasswordError(t(err.error));
      setIsSentOTP(false);
      setCooldown(0);
    } finally {
      setIsSendingOTP(false);
    }
  };

  const reSendOTP = async () => {
    try {
      if (!email) return;

      setIsSendingOTP(true);
      setResetPasswordError(null);

      const data: SendOTPToEmailRequestSchema = { email };
      await send(data);

      setIsSentOTP(true);
      setCooldown(60);
    } catch (e) {
      const err = e as ApiErrorResponseSchema;
      setResetPasswordError(t(err.error));
      setCooldown(0);
    } finally {
      setIsSendingOTP(false);
    }
  };

  const checkOTP = async (code: string) => {
    try {
      if (!email) return;

      setIsCheckingOtp(false);
      setResetPasswordError(null);

      const data: VerifyOTPRequestSchema = { email, code };
      const response = await verify(data);
      setResetPasswordToken(response.data?.resetToken || null);

      setIsVerifiedOTP(true);
    } catch (e) {
      const err = e as ApiErrorResponseSchema;
      setResetPasswordError(err.message);
    } finally {
      setIsCheckingOtp(false);
    }
  };

  const reset = async (newPassword: string) => {
    try {
      if (!email || !resetPasswordToken) return;

      setIsResettingPassword(true);
      setResetPasswordError(null);

      const data: ResetPasswordRequest = {
        email,
        resetPasswordToken,
        newPassword,
      };

      await resetPassword(data);

      window.location.href = APP_PATHS.SIGN_IN;
    } catch (e) {
      const err = e as ApiErrorResponseSchema;
      setResetPasswordError(err.message);
    } finally {
      setIsResettingPassword(false);
    }
  };

  const reEnterEmail = () => {
    setIsSentOTP(false);
    setIsVerifiedOTP(false);
    setEmail("");
    setResetPasswordError(null);
  };

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  return {
    cooldown,
    email,
    setEmail,
    resetPasswordError,
    isSendingOTP,
    isSentOTP,
    isVerifiedOTP,
    sendOTP,
    reSendOTP,
    checkOTP,
    reset,
    reEnterEmail,
    isCheckingOtp,
    isResettingPassword,
  };
}
