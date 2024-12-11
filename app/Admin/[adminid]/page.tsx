import React, { use } from "react";
import Link from "next/link";

 function  AdminDashboard({ params }: { params: Promise<{ adminid: string }> }) {
  const { adminid } = use(params);
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6"
      style={{ backgroundImage: "url('https://www.gehu.ac.in/assets/GEHU-BTL-b80ef66e.jpg')" }}
    >
      <h1 className="text-4xl font-bold text-white mb-8">Welcome Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <Link href={`/Admin/${adminid}/seecomplain`}>
          <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">View Department Complaints</h2>
            <p className="text-gray-600 text-center">
              See and manage complaints from all departments.
            </p>
          </div>
        </Link>
        <Link href={`/Admin/${adminid}/createmid`}>
          <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Assign Mid-Level Admin</h2>
            <p className="text-gray-600 text-center">
              Promote a user to manage departmental complaints.
            </p>
          </div>
        </Link>

        <Link href={`/Admin/${adminid}/createdepartment`}>
          <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Create new Department </h2>
            <p className="text-gray-600 text-center">
             Create Department if the deparment is Not present
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;