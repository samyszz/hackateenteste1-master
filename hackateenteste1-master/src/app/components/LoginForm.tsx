"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { t } = useTranslation();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('Header.login')}</CardTitle>
          <CardDescription>
            {t('LoginForm.enter_email')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t('LoginForm.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('LoginForm.email_placeholder')}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t('LoginForm.password')}</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t('LoginForm.forgot_password')}
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                {t('Header.login')}
              </Button>
              <Button variant="outline" className="w-full">
                {t('LoginForm.login_with_google')}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t('LoginForm.no_account')}{" "}
              <a href="#" className="underline underline-offset-4">
                {t('LoginForm.sign_up')}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}