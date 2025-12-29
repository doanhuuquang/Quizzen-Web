import axiosInstance from "@/lib/helpers/axios-config";
import { handleError } from "@/lib/helpers/error-handler";
import ApiSuccessResponseSchema from "@/lib/schemas/api-response-schemas/api-success-response-schema";
import LoginRequestSchema from "@/lib/schemas/auth-schemas/login-request-schema";
import RegisterRequestSchema from "@/lib/schemas/auth-schemas/signup-request-schema";

const SIGNIN_URL = "/api/account/login";
const SIGNUP_URL = "/api/account/register";

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

export { signInWithEmailAndPassword, signUpWithEmail };
