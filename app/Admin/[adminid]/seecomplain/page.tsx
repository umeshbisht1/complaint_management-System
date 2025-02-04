import React from "react";
import Link from "next/link";

const departments:string[] = ["IT", "Hostel", "Fee Cell", "Transport", "Others"];



export default function AdminDashboard() {
  

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-6 pb-10"
      style={{
        backgroundImage: "url('https://www.gehu.ac.in/assets/GEHU-BTL-b80ef66e.jpg')",
      }}
    >
      <h1
        className="text-white mb-[30px]"
        style={{
          textAlign: "center",
          color: "#dadada",
          marginBottom: "30px",
          fontSize: "2.5rem",
        }}
      >
        Welcome Admin
      </h1>

      <div className="flex flex-wrap justify-center gap-5">
        {departments.map((dept:string) => (
          <Link
            key={dept}
            href={`Depart/${dept}`}
            className="text-center w-[200px] p-5 bg-white rounded-lg shadow-md transition-transform hover:scale-105"
          >
            <div className="text-gray-800 font-bold text-lg">{dept}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
