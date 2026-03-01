"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "@/app/util/constant"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import logo from "@/public/logo.png"
import { ROUTE } from "@/app/util/pageRoutes"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()

  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUsername(val);
    if (val.length >= 3) {
      setUsernameError("");
    }
  }
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (val.length >= 6 && !val.includes(" ")) {
      setPasswordError("");
    }
  }


  async function submit() {
    let isValid = true;
    if (username.length < 3) {
      setUsernameError(ERROR_MESSAGE.USERNAME_LENGTH);
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (password.length < 6 || password.includes(" ")) {
      setPasswordError(ERROR_MESSAGE.PASSWORD_LENGTH);
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    const response = await fetch(ROUTE.API.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json()

    if (response.ok) {
      toast.success(data.message || SUCCESS_MESSAGE.LOGIN_SUCCESS)
      router.push(ROUTE.HOME)
    } else {
      toast.error(data.error || ERROR_MESSAGE.LOGIN_ERROR)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>

      <Card>
        <Image src={logo} alt='Logo' width={128} height={128} className="mx-auto" />
        <CardHeader>
          <CardTitle className="text-center">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                required
                value={username}
                onChange={usernameChange}
              />
              {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={passwordChange}
              />
              {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            </Field>
            <Field>
              <Button type="button" onClick={submit}>
                Login
              </Button>
              {/* <FieldDescription className="text-center">
                Don't have an account? <a href="#">Sign up</a>
              </FieldDescription> */}
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div >
  )
}
