"use client";
import React from "react";
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
  FormDescription,
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
    message: "problem must be at least 10 characters.",
  }),
  discription: z.string().min(10, {
    message: "Password must be at least 10 characters.",
  }),

  location: z.string().min(12, {
    message: "Enter the  valid location",
  }),
  department: z.enum(["IT", "Hostel", "Fee cell", "Transport", "others"], {
    message: "Select a valid department.",
  }),
});

function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problem: "",
      discription: "",
      location: "",
      department: "others",
    },
  });

  async function onSubmit({problem,discription,location,department}: z.infer<typeof formSchema>) {
   try {
    const complaindata={problem,discription,location,department}
    const complain=await createcompalin(complaindata);
    console.log(complain);
    
   } catch (error) {
     console.log("error occured in creating complain",error);
     
   }
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container w-[50%] flex-col py-10 hidden">
          <Image
            src="/assets/download.jpg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-2 h-10 w-fit"
          />
          <h1 className="header ">Hii there 👋</h1>
          <p className=" mb-3 text-green-400">Submit the complain.</p>
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
                            <Button className="w-[100%]">
                              {field.value.charAt(0).toUpperCase() +
                                field.value.slice(1)}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full">
                            {depart.map((item,index) => {
                              return (
                                <DropdownMenuItem
                                  className="w-full cursor-pointer"
                                  onClick={() => field.onChange(item)}
                                  key={index}
                                >
                                  {item}
                                </DropdownMenuItem>
                              );
                            })}
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
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discription</FormLabel>
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

              {/* Role Field */}

              <div className="text-center">
                <Button type="submit" className="border-[2px]">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
          <Link href="/viewcomplain" className="text-green-500 text-center my-3">
           Checkout all the complain
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
