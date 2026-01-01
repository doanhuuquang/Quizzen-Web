"use client";

import { Button } from "@/components/ui/button";
import { APP_IMAGES } from "@/lib/constants/app-images";
import {
  continueWithFacebook,
  continueWithGoogle,
  continueWithMicrosoft,
} from "@/services/auth-services";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function SignInOptions() {
  const t = useTranslations("Label");

  return (
    <div className="w-full space-y-4">
      <Button
        onClick={continueWithGoogle}
        variant={"outline"}
        className="w-full border-foreground dark:hover:bg-foreground hover:bg-foreground hover:text-background"
      >
        <Image
          src={APP_IMAGES.ICON_GOOGLE}
          alt="Google icon"
          width={24}
          height={24}
        />
        {t("ContinueWithGoogle")}
      </Button>

      <Button
        onClick={continueWithFacebook}
        variant={"outline"}
        className="w-full border-foreground hover:bg-foreground dark:hover:bg-foreground hover:text-background"
      >
        <Image
          src={APP_IMAGES.ICON_FACEBOOK}
          alt="Facebook icon"
          width={24}
          height={24}
        />
        {t("ContinueWithFacebook")}
      </Button>

      <Button
        onClick={continueWithMicrosoft}
        variant={"outline"}
        className="w-full border-foreground hover:bg-foreground dark:hover:bg-foreground hover:text-background group"
      >
        <Image
          src={APP_IMAGES.ICON_MICROSOFT}
          alt="Apple icon"
          width={24}
          height={24}
        />
        {t("ContinueWithMicrosoft")}
      </Button>
    </div>
  );
}
