import ApiErrorResponseSchema from "@/lib/schemas/api-response-schemas/api-error-response-schema";
import LoginRequestSchema from "@/lib/schemas/auth-schemas/login-request-schema";
import { signInWithEmailAndPassword } from "@/services/account-services";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function useSignIn() {
  const t = useTranslations("Errors");

  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  const signIn = async (data: LoginRequestSchema) => {
    try {
      setIsSigningIn(true);
      setSignInError(null);

      await signInWithEmailAndPassword(data);
    } catch (e) {
      const err = e as ApiErrorResponseSchema;
      setSignInError(t(err.error));
    } finally {
      setIsSigningIn(false);
    }
  };

  return {
    isSigningIn,
    signInError,
    signIn,
  };
}
