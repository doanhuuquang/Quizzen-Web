import { useTranslations } from "next-intl";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faInstagram,
  faTiktok,
  faFacebook,
  faYoutube,
  faThreads,
  faPinterest,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { ModeSwitcher } from "@/components/shared/mode-switcher";
import LocaleSwitcher from "@/components/shared/locale-switcher";

library.add(
  faInstagram,
  faTiktok,
  faFacebook,
  faYoutube,
  faThreads,
  faPinterest,
  faXTwitter
);

export default function AuthFooter() {
  const t = useTranslations("Footer");

  const footerNavLinks = [
    {
      title: t("AboutQuizzen"),
      href: "/about",
    },
    {
      title: t("Pricing&Plans"),
      href: "/pricing",
    },
    {
      title: t("LicenseTerms"),
      href: "/license-terms",
    },
    {
      title: t("Term&Conditions"),
      href: "/term-conditions",
    },
    {
      title: t("PrivacyPolicy"),
      href: "/privacy",
    },
    {
      title: t("Cookies"),
      href: "/cookies",
    },
    {
      title: t("DoNotSellOrShareMyPersonalInformation"),
      href: "/my-personal-information",
    },
    {
      title: t("HelpCenter"),
      href: "/hc",
    },
    {
      title: t("CookiesSettings"),
      href: "/cookies-settings",
    },
  ];

  const footerSocialLinks = [
    {
      icon: <FontAwesomeIcon icon={["fab", "instagram"]} size={"xl"} />,
      href: "https://instagram.com/quizzenapp",
    },
    {
      icon: <FontAwesomeIcon icon={["fab", "tiktok"]} size={"xl"} />,
      href: "https://tiktok.com/@quizzenapp",
    },
    {
      icon: <FontAwesomeIcon icon={["fab", "facebook"]} size={"xl"} />,
      href: "https://facebook.com/quizzenapp",
    },
    {
      icon: <FontAwesomeIcon icon={["fab", "youtube"]} size={"xl"} />,
      href: "https://youtube.com/quizzenapp",
    },
    {
      icon: <FontAwesomeIcon icon={["fab", "threads"]} size={"xl"} />,
      href: "https://threads.net/quizzenapp",
    },
    {
      icon: <FontAwesomeIcon icon={["fab", "pinterest"]} size={"xl"} />,
      href: "https://pinterest.com/quizzenapp",
    },
    {
      icon: <FontAwesomeIcon icon={["fab", "x-twitter"]} size={"xl"} />,
      href: "https://x.com/quizzenapp",
    },
  ];

  return (
    <footer className="w-full h-fit py-10 space-y-10 bg-soft-peach">
      {/* Links  */}
      <div className="flex flex-wrap divide-x md:px-6 gap-y-5">
        {footerNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 font-semibold hover:underline underline-offset-3"
          >
            {link.title}
          </Link>
        ))}
      </div>

      <div className="w-full flex flex-wrap items-center justify-between gap-10 md:px-10 px-4">
        {/* Social media links */}
        <div className="flex items-center gap-4">
          {footerSocialLinks.map((socialLink, index) => (
            <Link key={index} href={socialLink.href}>
              {socialLink.icon}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <LocaleSwitcher />
          <div className="h-5 w-0.5 bg-muted-foreground/20"></div>
          <ModeSwitcher />
        </div>
      </div>

      <p className="md:px-10 px-4 text-sm">{t("AllRightsReserved")}</p>
    </footer>
  );
}
