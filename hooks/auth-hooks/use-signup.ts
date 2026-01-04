import ApiErrorResponseSchema from "@/lib/schemas/api-response-schemas/api-error-response-schema";
import SignUpRequestSchema from "@/lib/schemas/auth-schemas/signup-request-schema";
import { signUpWithEmail } from "@/services/account-services";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function useSignUP() {
  const t = useTranslations("Errors");

  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>(false);

  const signUp = async (data: SignUpRequestSchema) => {
    try {
      setIsSigningUp(true);
      setSignUpError(null);
      setIsSignUpSuccess(false);

      await signUpWithEmail(data);

      setIsSignUpSuccess(true);
    } catch (e) {
      const err = e as ApiErrorResponseSchema;
      setSignUpError(t(err.error));
    } finally {
      setIsSigningUp(false);
    }
  };

  return { isSigningUp, signUpError, isSignUpSuccess, signUp };
}
