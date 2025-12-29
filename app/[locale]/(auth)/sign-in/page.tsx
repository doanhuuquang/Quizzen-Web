import { SignInForm } from "@/components/shared/auth/sign-in-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { APP_IMAGES } from "@/lib/constants/app-images";
import { APP_PATHS } from "@/lib/constants/app-paths";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const t = useTranslations("Label");

  return (
    <div className="w-full relative flex-1">
      {/* Background */}
      <div className="md:block hidden w-full h-full absolute -z-1 md:bg-[url(/images/background-images/login-background.jpg)] bg-cover bg-center">
        <div className="w-full h-full bg-black/20"></div>
      </div>

      <div className="w-full max-w-7xl h-full mx-auto md:p-10 flex lg:flex-row flex-col md:justify-between justify-center items-center gap-10">
        <div className="lg:pb-30 md:block hidden lg:text-6xl text-4xl font-bold text-white">
          {t("GreatToHaveYouback")}
        </div>

        <div className="w-full max-w-lg bg-container md:px-10 py-10 px-4 space-y-8 md:rounded-sm bg-background md:border border-foreground">
          <p className="text-center text-3xl font-black">{t("SignIn")}</p>

          {/* Sign In options */}
          <div className="w-full space-y-4">
            <Button
              variant={"outline"}
              className="w-full border-foreground dark:hover:bg-foreground hover:bg-foreground hover:text-background"
            >
              <Image
                src={APP_IMAGES.ICON_GOOGLE}
                alt="Google icon"
                width={30}
                height={30}
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
                width={28}
                height={28}
                className="block dark:hidden group-hover:hidden  group-hover:dark:block"
              />
              <Image
                src={APP_IMAGES.ICON_APPLE_WHITE}
                alt="Apple icon"
                width={28}
                height={28}
                className="hidden dark:block group-hover:block group-hover:dark:hidden"
              />
              {t("ContinueWithApple")}
            </Button>
            <Button
              variant={"outline"}
              className="w-full border-foreground hover:bg-foreground dark:hover:bg-foreground hover:text-background"
            >
              <Image
                src={APP_IMAGES.ICON_FACEBOOK}
                alt="Facebook icon"
                width={30}
                height={30}
              />
              {t("ContinueWithFacebook")}
            </Button>
          </div>

          {/* Login form */}
          <SignInForm />

          {/* Dont have account */}
          <div className="text-center space-x-1">
            <span className="">{t("NewHere")}</span>
            <Link href={APP_PATHS.SIGN_UP}>
              <span className="font-semibold underline">
                {t("CreateAnQuizzenAccount")}
              </span>
            </Link>
          </div>

          <Separator />

          {/* Terms */}
          <div className="text-sm space-x-1">
            <span>{t("BySigningIn")}</span>
            <span className="underline">
              <Link href={""}>{t("PrivacyPolicy")}</Link>
            </span>
            <span>{t("And")}</span>
            <span className="underline">
              <Link href={""}>{t("TermsOfService")}</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
