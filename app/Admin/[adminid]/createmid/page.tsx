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
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { changeu } from "@/lib/actions/user.actions";

const formSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  department: z.string().min(1, { message: "Please select a department." }),
  role: z.string().min(1, { message: "Please select a role." }), // Role validation
});

const AssignMidLevelAdmin = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showToast, setShowToast] = useState(false); // For controlling toast visibility
  const [toastMessage, setToastMessage] = useState(""); // To set dynamic toast message
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      department: "",
      role: "", // Adding default role value
    },
  });

  const departments = ["IT", "Hostel", "Transport", "Operations", "Sales"];
  const roles = ["admin", "mid_admin"]; // Role options

  const onSubmit = async ({ userId, department, role }: any) => {
    try {
      const changedata = { userId, department, role };
      const changeuser = await changeu(changedata);
      if (changeuser !== null) {
        setToastMessage("User role updated successfully!");
      } else setToastMessage("user not assigned successfully");
      setShowToast(true);
    } catch (error: any) {
      setToastMessage(error?.message || "user not assigned successfully");
      setShowToast(true);
    }
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
          Assign Role
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* User ID Input */}
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <Input placeholder="Enter User ID" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dropdown for Department Selection */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        {selectedDepartment || "Select Department"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {departments.map((dept) => (
                        <DropdownMenuItem
                          className="text-black bg-white w-full cursor-pointer"
                          key={dept}
                          onClick={() => {
                            setSelectedDepartment(dept);
                            field.onChange(dept); // Update form state
                          }}
                        >
                          {dept}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dropdown for Role Selection */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        {selectedRole || "Select Role"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {roles.map((role) => (
                        <DropdownMenuItem
                          className="text-black bg-white w-full cursor-pointer"
                          key={role}
                          onClick={() => {
                            setSelectedRole(role);
                            field.onChange(role); // Update form state
                          }}
                        >
                          {role}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Assign Role
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
