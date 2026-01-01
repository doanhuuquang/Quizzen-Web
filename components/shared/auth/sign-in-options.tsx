"use client";

import { Button } from "@/components/ui/button";
import useSignIn from "@/hooks/auth-hooks/use-signin";
import { APP_IMAGES } from "@/lib/constants/app-images";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function SignInOptions() {
  const t = useTranslations("Label");
  const { signInWithGoogle, signInWithFacebook } = useSignIn();

  return (
    <div className="w-full space-y-4">
      <Button
        onClick={signInWithGoogle}
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
        variant={"outline"}
        className="w-full border-foreground hover:bg-foreground dark:hover:bg-foreground hover:text-background group"
      >
        <Image
          src={APP_IMAGES.ICON_APPLE}
          alt="Apple icon"
          width={24}
          height={24}
          className="block dark:hidden group-hover:hidden  group-hover:dark:block"
        />
        <Image
          src={APP_IMAGES.ICON_APPLE_WHITE}
          alt="Apple icon"
          width={24}
          height={24}
          className="hidden dark:block group-hover:block group-hover:dark:hidden"
        />
        {t("ContinueWithApple")}
      </Button>
      <Button
        onClick={signInWithFacebook}
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
    </div>
  );
}
