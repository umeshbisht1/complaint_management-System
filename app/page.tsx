"use client"
import Image from "next/image";
import Link from "next/link";
import { Complainform } from "@/components/forms/Complainform";

export default  function Home() {
  
  return (
   
    <div className="flex h-screen max-h-screen text-white">
      {/* {isAdmin && <PasskeyModal />} */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/download.jpg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
           <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-green-700">Get started with Complaints.</p>
        </section>
         <Complainform></Complainform>
         <Link href="/register" className="text-red-500 text-center my-4">
             Don't have account
            </Link>
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Complaint
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/GEHU-BTL-b80ef66e.jpg"
        height={1000}
        width={1000}
        alt="GEHHU"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
