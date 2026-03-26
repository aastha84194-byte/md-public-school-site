"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-hooks";
import { useToast } from "@/components/ui/toast";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock, User } from "lucide-react";

import { PasswordInput } from "@/components/ui/password-input";

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const loginData = {
      username_or_email: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    
    try {
      await login(loginData);
      toast("Login successful! Redirecting...", "success");
    } catch (err: any) {
      const msg = err.message || "Invalid credentials. Please try again.";
      setError(msg);
      toast(msg, "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col font-sans bg-zinc-50 dark:bg-black">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <Card className="w-full max-w-md border-none shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-primary">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Username or Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                  <Input 
                    id="username" 
                    name="username" 
                    placeholder="john.doe" 
                    className="pl-10" 
                    required 
                    minLength={3}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                  <PasswordInput 
                    id="password" 
                    name="password" 
                    placeholder="••••••••"
                    className="pl-10" 
                    required 
                    minLength={4}
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-secondary text-primary font-bold hover:bg-secondary/90 transition-transform active:scale-95" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
