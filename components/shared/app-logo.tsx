import Image from "next/image";
import { cn } from "@/lib/utils";
import { APP_IMAGES } from "@/lib/constants/app-images";
import Link from "next/link";
import { APP_PATHS } from "@/lib/constants/app-paths";

type LogoType = "full" | "icon";
type LogoSize = "sm" | "md" | "lg";
type ForcedTheme = "auto" | "light" | "dark";

interface AppLogoProps {
  type?: LogoType;
  size?: LogoSize;
  className?: string;
  forcedTheme?: ForcedTheme;
}

const logoDimensions: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 64, height: 64 },
};

const fullLogoDimensions: Record<LogoSize, { width: number; height: number }> =
  {
    sm: { width: 100, height: 24 },
    md: { width: 120, height: 34 },
    lg: { width: 140, height: 44 },
  };

export default function AppLogo({
  type = "full",
  size = "md",
  className,
  forcedTheme = "auto",
}: AppLogoProps) {
  const dimensions =
    type === "full" ? fullLogoDimensions[size] : logoDimensions[size];

  const lightLogoClass =
    forcedTheme === "dark"
      ? "hidden"
      : forcedTheme === "light"
      ? "block"
      : "dark:hidden block";

  const darkLogoClass =
    forcedTheme === "light"
      ? "hidden"
      : forcedTheme === "dark"
      ? "block"
      : "hidden dark:block";

  return (
    <Link
      href={APP_PATHS.HOME}
      className={cn("relative flex items-center justify-center", className)}
    >
      <Image
        src={
          type === "full"
            ? APP_IMAGES.QUIZZEN_LOGO_FULL_LIGHT
            : APP_IMAGES.QUIZZEN_ICON_LIGHT
        }
        alt="Quizzen Logo"
        width={dimensions.width}
        height={dimensions.height}
        className={cn(lightLogoClass, "object-contain")}
        priority
      />
      <Image
        src={
          type === "full"
            ? APP_IMAGES.QUIZZEN_LOGO_FULL_DARK
            : APP_IMAGES.QUIZZEN_ICON_DARK
        }
        alt="Quizzen Logo"
        width={dimensions.width}
        height={dimensions.height}
        className={cn(darkLogoClass, "object-contain")}
        priority
      />
    </Link>
  );
}
