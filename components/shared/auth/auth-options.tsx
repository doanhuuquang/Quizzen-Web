"use client";

import { Button } from "@/components/ui/button";
import {
  continueWithFacebook,
  continueWithGoogle,
  continueWithMicrosoft,
} from "@/services/account-services";
import { useTranslations } from "next-intl";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGoogle,
  faWindows,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faGoogle, faWindows, faFacebook);

export default function AuthOptions() {
  const t = useTranslations("Pages.Auth.Options");

  return (
    <div className="w-full space-y-4">
      <Button
        onClick={continueWithGoogle}
        variant={"outline"}
        className="w-full border-foreground dark:hover:bg-foreground hover:bg-foreground hover:text-background"
      >
        <FontAwesomeIcon icon={["fab", "google"]} size={"xl"} />
        {t("ContinueWithGoogle")}
      </Button>

      <Button
        onClick={continueWithFacebook}
        variant={"outline"}
        className="w-full border-foreground hover:bg-foreground dark:hover:bg-foreground hover:text-background"
      >
        <FontAwesomeIcon icon={["fab", "facebook"]} size={"xl"} />
        {t("ContinueWithFacebook")}
      </Button>

      <Button
        onClick={continueWithMicrosoft}
        variant={"outline"}
        className="w-full border-foreground hover:bg-foreground dark:hover:bg-foreground hover:text-background group"
      >
        <FontAwesomeIcon icon={["fab", "windows"]} size={"xl"} />
        {t("ContinueWithMicrosoft")}
      </Button>
    </div>
  );
}
