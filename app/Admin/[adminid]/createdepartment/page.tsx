"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { changeu, createdepart } from "@/lib/actions/user.actions";

const formSchema = z.object({
  
  department: z.string().min(2, { message: "Please Enter a department." }),
 
});

const AssignMidLevelAdmin = () => {
  const [loading,setLoading]=useState(false);
  const [showToast, setShowToast] = useState(false); // For controlling toast visibility
  const [toastMessage, setToastMessage] = useState(""); // To set dynamic toast message
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: "",
     
    },
  });


  const onSubmit = async ({  department }: any) => {
    setLoading(true);
    try {
      const changedata = { department};
     const depart=await createdepart(changedata);
     if(depart)  
      {setToastMessage("Department created successfully");}
      setShowToast(true);
    } catch (error: any) {
      setToastMessage(error?.message || "Department not created successfully");
      setShowToast(true);
    }
    setLoading(false);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div
      className=" bg-white min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://www.gehu.ac.in/assets/GEHU-BTL-b80ef66e.jpg')",
      }}
    >
      <div className=" bg-white text-[#252222] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Welcome Admin
        </h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Create Department...
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* User ID Input */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Input placeholder="Enter the department Name" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              {loading?"Creating":"Create Department"}
            </Button>
            {showToast && (
              <button className="text-red-700 w-full">{toastMessage}</button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AssignMidLevelAdmin;