"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useReCaptcha from "@/hooks/auth-hooks/use-recaptcha";
import useResetPassword from "@/hooks/auth-hooks/use-reset-password";
import SendOTPToEmailRequestSchema from "@/lib/schemas/auth-schemas/send-otp-to-email-request-schema copy";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Info, LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import z from "zod";

interface EmailInputProps {
  email: string;
  isSendingOTP: boolean;
  resetPasswordError: string | null;
  sendOTP: (data: SendOTPToEmailRequestSchema) => void;
  setEmail: (email: string) => void;
}

interface OTPInputProps {
  email: string;
  isSendingOTP: boolean;
  isCheckingOtp: boolean;
  resetPasswordError: string | null;
  isSentOTP: boolean;
  cooldown: number;
  back: () => void;
  reSendOTP: () => void;
  checkOTP: (code: string) => void;
}

interface NewPasswordInputProps {
  reset: (newPassword: string) => void;
  isResettingPassword: boolean;
  resetPasswordError: string | null;
}

function EmailInput({
  email,
  isSendingOTP,
  resetPasswordError,
  sendOTP,
  setEmail,
}: EmailInputProps) {
  const t = useTranslations("Pages.Auth.ResetPassword.Form");
  const tv = useTranslations("Validations");

  const { setToken, isVerified, setIsVerified } = useReCaptcha();

  const formSchema = z.object({
    email: z.email(tv("EmailIsNotValid")).min(1, {
      message: tv("EmailIsRequired"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data: SendOTPToEmailRequestSchema = { email: values.email };
    sendOTP(data);

    setEmail(values.email);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FormField
          control={form.control}
          name="email"
          disabled={isSendingOTP}
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel className="data-[error=true]:text-foreground font-bold">
                  {t("Email")}
                </FormLabel>
              </div>
              <FormControl>
                <InputGroup>
                  <InputGroupInput {...field} />
                  {form.formState.isSubmitted &&
                    form.formState.errors.email && (
                      <InputGroupAddon align="inline-end">
                        <Info className="size-6 fill-destructive text-background" />
                      </InputGroupAddon>
                    )}
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-destructive text-sm">{resetPasswordError}</p>

        {form.formState.isValid &&
          process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY && (
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
              onChange={(token: string | null) => {
                setToken(token);
              }}
              onExpired={() => {
                setToken(null);
                setIsVerified(false);
              }}
            />
          )}

        <Button
          type="submit"
          disabled={isSendingOTP || !isVerified}
          className="md:w-fit w-full"
        >
          {isSendingOTP && <LoaderCircle className="animate-spin" />}
          {t("SendOTP")}
        </Button>
      </form>
    </Form>
  );
}

function OtpInput({
  email,
  isSendingOTP,
  isCheckingOtp,
  resetPasswordError,
  isSentOTP,
  cooldown,
  back,
  reSendOTP,
  checkOTP,
}: OTPInputProps) {
  const t = useTranslations("Pages.Auth.ResetPassword.Form");
  const tv = useTranslations("Validations");

  const formSchema = z.object({
    otp: z.string().min(6, {
      message: tv("OTPIsRequired"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    checkOTP(values.otp);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FormField
          control={form.control}
          name="otp"
          disabled={isCheckingOtp}
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel className="data-[error=true]:text-foreground font-bold">
                  {t("OTP")}
                </FormLabel>
              </div>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-destructive text-sm">{resetPasswordError}</p>

        {email !== null && (
          <p>
            {t("AnOTPHasBeenSent")}{" "}
            <span className="font-semibold">{email}</span>
          </p>
        )}

        {isSentOTP && (
          <div>
            <span>{t("DidntReceiveTheCode")} </span>
            <Button
              disabled={isSendingOTP || cooldown > 0}
              type="button"
              variant={"ghost"}
              className="font-semibold underline hover:cursor-pointer p-0 h-fit hover:bg-transparent"
              onClick={() => reSendOTP()}
            >
              {t("ResendOTP")} {cooldown > 0 && `(${cooldown}s)`}{" "}
              {isSendingOTP && (
                <LoaderCircle className="animate-spin inline-block size-4" />
              )}
            </Button>
          </div>
        )}

        <div className="flex gap-4 items-center flex-wrap-reverse">
          <Button
            onClick={back}
            variant={"outline"}
            className="md:w-fit w-full"
          >
            {t("Back")}
          </Button>

          <Button
            type="submit"
            disabled={isCheckingOtp}
            className="md:w-fit w-full"
          >
            {isCheckingOtp && <LoaderCircle className="animate-spin" />}
            {t("CheckOTP")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function NewPasswordInput({
  reset,
  isResettingPassword,
  resetPasswordError,
}: NewPasswordInputProps) {
  const t = useTranslations("Pages.Auth.ResetPassword.Form");
  const tv = useTranslations("Validations");

  const formSchema = z.object({
    password: z
      .string()
      .min(8, {
        message: tv("PasswordMinLength"),
      })
      .regex(/[a-z]/, { message: tv("PasswordLowercase") })
      .regex(/[A-Z]/, { message: tv("PasswordUppercase") })
      .regex(/[0-9]/, { message: tv("PasswordDigit") })
      .regex(/[^a-zA-Z0-9]/, tv("PasswordSpecialChar")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    reset(values.password);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FormField
          control={form.control}
          name="password"
          disabled={isResettingPassword}
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel className="data-[error=true]:text-foreground font-bold">
                  {t("NewPassword")}
                </FormLabel>
              </div>
              <FormControl>
                <InputGroup>
                  <InputGroupInput {...field} />
                  {form.formState.isSubmitted &&
                    form.formState.errors.password && (
                      <InputGroupAddon align="inline-end">
                        <Info className="size-6 fill-destructive text-background" />
                      </InputGroupAddon>
                    )}
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-destructive text-sm">{resetPasswordError}</p>

        <Button
          type="submit"
          disabled={isResettingPassword}
          className="md:w-fit w-full"
        >
          {isResettingPassword && <LoaderCircle className="animate-spin" />}
          {t("ResetPassword")}
        </Button>
      </form>
    </Form>
  );
}

export default function ResetPasswordForm() {
  const {
    email,
    setEmail,
    isSentOTP,
    isSendingOTP,
    isVerifiedOTP,
    resetPasswordError,
    reEnterEmail,
    sendOTP,
    reSendOTP,
    checkOTP,
    reset,
    cooldown,
    isCheckingOtp,
    isResettingPassword,
  } = useResetPassword();

  if (!isSentOTP)
    return (
      <EmailInput
        sendOTP={sendOTP}
        isSendingOTP={isSendingOTP}
        resetPasswordError={resetPasswordError}
        email={email}
        setEmail={setEmail}
      />
    );
  else if (isSentOTP && !isVerifiedOTP)
    return (
      <OtpInput
        back={reEnterEmail}
        resetPasswordError={resetPasswordError}
        isSentOTP={isSentOTP}
        cooldown={cooldown}
        reSendOTP={reSendOTP}
        email={email}
        isSendingOTP={isSendingOTP}
        isCheckingOtp={isCheckingOtp}
        checkOTP={checkOTP}
      />
    );
  else
    return (
      <NewPasswordInput
        reset={reset}
        isResettingPassword={isResettingPassword}
        resetPasswordError={resetPasswordError}
      />
    );
}
