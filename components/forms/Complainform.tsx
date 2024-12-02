"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { loginuser } from "@/lib/actions/user.actions"
import { useRouter } from "next/navigation"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
const formSchema = z.object({
  Email: z.string().min(10, {
    message: "Enter the valid Email.",
  }),
  Password: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
})

export function Complainform() {
  const router=useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password:""
    },
  })

 
  async function onSubmit({Email,Password}: z.infer<typeof formSchema>) {
      try {
        const session=await loginuser({Email,Password});
        console.log(session);
        router.push("/profile");
      } catch (error) {
        
      }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="Email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="abc@gmail.com" {...field} />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
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
              <Input placeholder="xyz@123" {...field} />
            </FormControl>
            <FormDescription>
             Enter the password
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="text-center"><Button  className="text-center mx-auto" type="submit">Submit</Button></div>
    </form>
  </Form>
  )
  
}
