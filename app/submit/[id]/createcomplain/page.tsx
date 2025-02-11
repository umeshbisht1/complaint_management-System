"use client";
import React, { useState, useEffect } from "react";
import { use } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createcompalin } from "@/lib/actions/user.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const depart = ["IT", "Hostel", "Fee cell", "Transport", "others"];

const formSchema = z.object({
  problem: z.string().min(10, {
    message: "Problem must be at least 10 characters.",
  }),
  discription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.string().min(12, {
    message: "Enter a valid location.",
  }),
  department: z.enum(["IT", "Hostel", "Fee cell", "Transport", "others"], {
    message: "Select a valid department.",
  }),
});

function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problem: "",
      discription: "",
      location: "",
      department: "others",
    },
  });

  async function onSubmit({ problem, discription, location, department }: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const complaindata = { problem, discription, location, department, owner_id: id };
      await createcompalin(complaindata);
      setSubmissionStatus({ success: true, message: "Complaint registered successfully!" });
    } catch (error) {
      setIsSubmitting(false);
      setSubmissionStatus({ success: false, message: "Error occurred in creating complaint." });
      console.log(error);
      
    }
    finally{
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (submissionStatus) {
      const timeout = setTimeout(() => {
        setSubmissionStatus(null);
      }, 3000); // Message disappears after 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [submissionStatus]);

  return (
    <div className="flex h-screen max-h-screen text-white">
      <section className="remove-scrollbar container">
        <div className="sub-container w-[50%] flex-col py-10 hidden">
          <Image
            src="/assets/download.jpg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-2 h-10 w-fit"
          />
          <h1 className="header">GEHU Complaints Management System 👋</h1>
          <p className="mb-3 text-green-400">Submit the complaint.</p>

          {submissionStatus && (
            <div
              className={`text-center p-3 rounded-lg ${
                submissionStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {submissionStatus.message}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <div className="w-full border-[2px] rounded-lg">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="w-[100%] text-white">
                              {field.value.charAt(0).toUpperCase() +
                                field.value.slice(1)}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full">
                            {depart.map((item, index) => (
                              <DropdownMenuItem
                                className="w-full cursor-pointer text-white"
                                onClick={() => field.onChange(item)}
                                key={index}
                              >
                                {item}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="problem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the problem Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="......." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Admin block 3rd floor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit" className="border-[2px]">
                {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
          <Link
            href={`/submit/${id}/profile`}
            className="text-green-500 text-center my-3"
          >
            Check out all the complaints
          </Link>
          <p className="copyright py-12">© 2024 Complaint</p>
        </div>
      </section>
      <Image
        src="/assets/GEHU-BTL-b80ef66e.jpg"
        height={1000}
        width={1000}
        alt="Gehu"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}

export default Page;

