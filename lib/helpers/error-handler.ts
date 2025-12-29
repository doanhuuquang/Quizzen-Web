import ApiErrorResponseSchema from "@/lib/schemas/api-response-schemas/api-error-response-schema";
import axios from "axios";

export const handleError = (error: unknown): ApiErrorResponseSchema => {
  if (axios.isAxiosError(error))
    throw error.response?.data as ApiErrorResponseSchema;
  throw {
    statusCode: 5000,
    error: "UnknownError",
    message: "An unknown error occurred",
    timestamp: new Date(),
  } as ApiErrorResponseSchema;
};
