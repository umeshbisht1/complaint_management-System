"use client";
import React, { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createUser } from "@/lib/actions/user.actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  Password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  Email: z.string().email("Enter a valid email."),
  ID: z.string().min(8, {
    message: "Enter your college id.",
  }),
  phoneno: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
});

function RegisterPage() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      Password: "",
      Email: "",
      ID: "",
      phoneno: "",
    },
  });

  async function onSubmit({
    username,
    Password,
    Email,
    ID,
    phoneno,
  }: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const userdata = { username, Password, Email, ID, phoneno };
      const user = await createUser(userdata);

      if (user) {
        toast.success("Registration successful! Redirecting to login page...", {
          autoClose: 3000,
        });
        setTimeout(() => router.push("/"), 3000);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen max-h-screen text-white">
      <section className="remove-scrollbar container">
        <div className="sub-container flex-1 flex-col py-10 hidden w-[50%]">
          <Image
            src="/assets/download.jpg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-2 h-10 w-fit"
          />
          <h1 className="header ">Hi there 👋</h1>
          <p className=" mb-3 text-green-400">
            Register with GEHU Complaint Management System.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input placeholder="........" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="xyzabc@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="xyzabc"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit" disabled={isLoading} className="border-[2px]">
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
          </Form>
          <Link href="/" className="text-red-500 text-center my-3">
            Already have an account
          </Link>
          <p className="copyright py-12">© 2024 Complaint</p>
        </div>
      </section>
      <Image
        src="/assets/GEHU-BTL-b80ef66e.jpg"
        height={1000}
        width={1000}
        alt="Gehu"
        className="side-img w-[50%]"
      />
    </div>
  );
}

export default RegisterPage;
