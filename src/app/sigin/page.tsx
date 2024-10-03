"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

  export default function() {
    const router = useRouter();
    const [email, setEmail] = useState(""); // State to store email
    const [password, setPassword] = useState(""); // State to store password

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email} // Set value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
              id="password" 
              type="password" 
              required
              value={password} // Set value to state
              onChange={(e) => setPassword(e.target.value)} // Update state on change
              />
            </div>
            <Button type="submit" className="w-full"onClick={async () => {
            const res = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            });
            console.log(res);
            if (res?.error) {
              alert(res.error);
            } else {
              router.push("/dashboard");
            }
        }}>
              Login
            </Button>
            <Button variant="outline" className="w-full" onClick={async () => {
                const res = await signIn("google", { callbackUrl: 'http://localhost:3000/dashboard' });
                console.log(res);
                if (res?.error) {
                  alert(res.error);
                }
            }}>
                Login with Google
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-slate-200 h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="max-w-lg">
                    <div className="text-3xl font-bold">
                    "The customer support I received was exceptional. The support team went above and beyond to address my concern"
                    </div>
                    <div className="max-w-md text-xl font-semibold mt-4">
                        Jules Winnfield
                    </div>
                    <div className="max-w-md text-sm font-semibold text-slate-400">
                        CEO, Acme Inc
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
