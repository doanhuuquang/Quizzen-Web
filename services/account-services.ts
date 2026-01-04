import ResetPasswordRequest from "@/lib/dtos/requests/reset-password-request";
import axiosInstance from "@/lib/helpers/axios-config";
import { handleError } from "@/lib/helpers/error-handler";
import ApiSuccessResponseSchema from "@/lib/schemas/api-response-schemas/api-success-response-schema";
import LoginRequestSchema from "@/lib/schemas/auth-schemas/login-request-schema";
import RecoverUsernameRequestSchema from "@/lib/schemas/auth-schemas/recover-username-request-schema";
import RegisterRequestSchema from "@/lib/schemas/auth-schemas/signup-request-schema";

const SIGNIN_URL = "/api/account/login";
const SIGNUP_URL = "/api/account/register";
const RECOVER_USERNAME_URL = "/api/account/recover-username";
const RESET_PASSWORD_URL = "/api/account/reset-password";

const signInWithEmailAndPassword = async (
  data: LoginRequestSchema
): Promise<ApiSuccessResponseSchema> => {
  try {
    const response = await axiosInstance.post(SIGNIN_URL, data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

const signUpWithEmail = async (
  data: RegisterRequestSchema
): Promise<ApiSuccessResponseSchema> => {
  try {
    const response = await axiosInstance.post(SIGNUP_URL, data);
    console.log("Sign Up Response:", response.data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

const continueWithGoogle = () => {
  window.location.href =
    "https://localhost:7092/api/account/login/google?returnUrl=http://localhost:3000";
};

const continueWithFacebook = () => {
  window.location.href =
    "https://localhost:7092/api/account/login/facebook?returnUrl=http://localhost:3000";
};

const continueWithMicrosoft = () => {
  window.location.href =
    "https://localhost:7092/api/account/login/microsoft?returnUrl=http://localhost:3000";
};

const recoverUsername = async (
  data: RecoverUsernameRequestSchema
): Promise<ApiSuccessResponseSchema> => {
  try {
    const response = await axiosInstance.post(RECOVER_USERNAME_URL, data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ApiSuccessResponseSchema> => {
  try {
    const response = await axiosInstance.post(RESET_PASSWORD_URL, data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export {
  signInWithEmailAndPassword,
  signUpWithEmail,
  continueWithGoogle,
  continueWithFacebook,
  continueWithMicrosoft,
  recoverUsername,
  resetPassword,
};
