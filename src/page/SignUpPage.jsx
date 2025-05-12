import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";

const SignUpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be atleast of 6 characters"),
  name: z.string().min(3, "Name must be atleast 3 characters"),
});

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isSigninUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signup(data);
      console.log("signup data", data);
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <Card className="w-[400px] shadow-md rounded-2xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
            <p className="text-sm text-gray-500 mb-6 text-center">
              Sign Up to your account
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} placeholder="John Doe" />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="m@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSigninUp}>
              {isSigninUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
              </Button>

              <Button type="button" variant="outline" className="w-full mt-2">
                Sign Up with Google
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <a href="#" className="text-black font-medium hover:underline">
                Login
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <img
          src="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Sign Up Illustration"
          className="max-w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};
