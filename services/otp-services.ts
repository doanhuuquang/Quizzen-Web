import VerifyOTPResponse from "@/lib/dtos/responses/verify-otp-response";
import axiosInstance from "@/lib/helpers/axios-config";
import { handleError } from "@/lib/helpers/error-handler";
import ApiSuccessResponseSchema from "@/lib/schemas/api-response-schemas/api-success-response-schema";
import SendOTPToEmailRequestSchema from "@/lib/schemas/auth-schemas/send-otp-to-email-request-schema copy";
import VerifyOTPRequestSchema from "@/lib/schemas/auth-schemas/verify-otp-schema";

const SEND_OTP_URL = "/api/otp/send";
const VERIFY_OTP_URL = "/api/otp/verify";

const send = async (
  data: SendOTPToEmailRequestSchema
): Promise<ApiSuccessResponseSchema> => {
  try {
    const response = await axiosInstance.post(SEND_OTP_URL, data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

const verify = async (
  data: VerifyOTPRequestSchema
): Promise<ApiSuccessResponseSchema<VerifyOTPResponse>> => {
  try {
    const response = await axiosInstance.post(VERIFY_OTP_URL, data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export { send, verify };
