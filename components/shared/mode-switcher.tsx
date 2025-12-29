"use client";

import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useMounted } from "@/hooks/use-mouted";
import { Laptop, Moon, Palette, Sun } from "lucide-react";

export function ModeSwitcher() {
  const mounted = useMounted();
  const t = useTranslations("Theme");
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      value: "system",
      name: t("System"),
      icon: Laptop,
    },
    {
      value: "light",
      name: t("Light"),
      icon: Sun,
    },
    {
      value: "dark",
      name: t("Dark"),
      icon: Moon,
    },
  ];

  const CurrentIcon = themes.find((t) => t.value === theme)?.icon;

  if (!mounted) return null;

  return (
    <Select value={theme} onValueChange={(value) => setTheme(value)}>
      <SelectTrigger className="w-fit font-bold text-foreground border-none shadow-none text-md bg-transparent dark:bg-transparent p-0">
        {CurrentIcon && <CurrentIcon className="text-foreground size-5" />}
        <SelectValue placeholder={t("SelectTheme")} />
      </SelectTrigger>
      <SelectContent position="popper" align="end">
        {themes.map((theme) => (
          <SelectItem key={theme.value} value={theme.value}>
            {theme.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
