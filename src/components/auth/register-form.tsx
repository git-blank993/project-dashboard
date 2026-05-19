"use client";

import { useActionState } from "react";
import { registerAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, undefined);

  return (
    <Card className="w-full max-w-md shadow-lg border-border">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Register</CardTitle>
        <CardDescription className="text-muted-foreground">
          Create an account to access the dashboard.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="affiliation">Affiliation</Label>
            <Select name="affiliation" required>
              <SelectTrigger>
                <SelectValue placeholder="Select your affiliation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fedex">FedEx</SelectItem>
                <SelectItem value="iitb">IIT Bombay</SelectItem>
                <SelectItem value="iitm">IIT Madras</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          {state?.error && <p className="text-sm font-medium text-destructive">{state.error}</p>}
          {state?.success && <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">User registered successfully!</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating account..." : "Register User"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
