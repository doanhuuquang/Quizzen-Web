import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quizzen",
  description: "An online quiz platform to test your knowledge and have fun!",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${manrope.className} antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
