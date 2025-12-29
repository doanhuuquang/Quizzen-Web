import ApiSuccessResponseSchema from "@/lib/schemas/api-response-schemas/api-success-response-schema";
import LoginRequestSchema from "@/lib/schemas/auth-schemas/login-request-schema";
import { loginWithEmailAndPassword } from "@/services/auth-services";
import { useState } from "react";

export default function useLogout() {
  const [isLogginOut, setIsLogginOut] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequestSchema) => {
    setIsLogginOut(true);
    setError(null);

    const response: ApiSuccessResponseSchema = await loginWithEmailAndPassword(
      data
    );

    console.log(response);

    setIsLogginOut(false);
  };

  return { isLogginOut, error, login };
}
