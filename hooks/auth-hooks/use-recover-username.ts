import ApiErrorResponseSchema from "@/lib/schemas/api-response-schemas/api-error-response-schema";
import RecoverUsernameRequestSchema from "@/lib/schemas/auth-schemas/recover-username-request-schema";
import { recoverUsername } from "@/services/account-services";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function useRecoverUsername() {
  const t = useTranslations("Errors");

  const [isRecovering, setIsRecovering] = useState<boolean>(false);
  const [recorverUsernameError, setRecoverUsernameError] = useState<
    string | null
  >(null);
  const [isRecoverUsernameSent, setIsRecoverUsernameSent] =
    useState<boolean>(false);
  const [cooldown, setCooldown] = useState<number>(0);

  const recover = async (data: RecoverUsernameRequestSchema) => {
    try {
      setIsRecovering(true);
      setRecoverUsernameError(null);
      setIsRecoverUsernameSent(false);

      await recoverUsername(data);

      setIsRecoverUsernameSent(true);
      setCooldown(60);
    } catch (e) {
      const err = e as ApiErrorResponseSchema;
      setRecoverUsernameError(t(err.error));
      setIsRecoverUsernameSent(false);
    } finally {
      setIsRecovering(false);
    }
  };

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  return {
    isRecovering,
    recorverUsernameError,
    isRecoverUsernameSent,
    recover,
    cooldown,
  };
}
