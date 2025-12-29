"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

interface ReCaptchaProviderProps {
  children: React.ReactNode;
}

export function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

  if (!reCaptchaKey) return;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey} language={"en"}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
