"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export function SignupForm({}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-4xl overflow-hidden p-0 shadow-xl">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 p-0">
          {/* Form Section */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold">Welcome!</h1>
              <p className="text-muted-foreground">
                Create your E-Commerce Inc account
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>

          {/* Image Section */}
          <div className="hidden md:block relative h-full">
            <Image
              src="/images/login.webp"
              alt="Signup image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
              width={1000}
              height={1000}
              priority
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
