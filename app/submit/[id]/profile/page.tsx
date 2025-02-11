import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getComplaintsByUserId, getuserbyid } from "@/lib/actions/user.actions";
// type Complaint = {
//   problem: string;
//   description: string;
//   owner_id: string;
//   department: string;
//   location: string;
//   status: "pending" | "completed";
//   createdAt: string;
// };
type Params = Promise<{ id: string }>;
const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const user = await getuserbyid(id);

  const complaints = await getComplaintsByUserId(id, "in-progress");
  console.log(complaints);

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "in-progress"
  );
  const completedComplaints = complaints.filter(
    (complaint) => complaint.status === "resolved"
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://www.gehu.ac.in/assets/GEHU-BTL-b80ef66e.jpg')",
      }}
    >
      <div className="flex flex-col items-center justify-between h-full">
        {/* Top Section: Logo, GEHU Dashboard Text, and Logout Button */}
        <div className="w-full bg-black bg-opacity-60 py-4 px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/assets/download.jpg"
              height={1000}
              width={1000}
              alt="logo"
              className="mb-2 h-10 w-fit"
            />

            <h1 className="text-2xl text-white font-bold">GEHU Dashboard</h1>
          </div>
          <button className="bg-red-400 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-md">
            <Link href={`/submit/${id}/createcomplain`}>Create_complain</Link>
          </button>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col items-center justify-center w-full text-center px-4 py-6 bg-[#ffffff70] bg-opacity-80 rounded-lg shadow-md max-w-4xl mx-auto mt-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Hello, user👋🏿👋🏿 {user?.Name}
          </h1>
          <h1 className="text-3xl font-bold text-gray-800">
            ID.....{user?.user_id}
          </h1>

          <p className="text-lg mt-2 text-gray-600">
            Welcome to your complaint dashboard.
          </p>

          {/* Complaints Section */}
          <div className="w-full mt-8 opacity-0.2">
            <h2 className="text-2xl font-semibold text-gray-800">Complaints</h2>

            {/* Pending Complaints */}
            {pendingComplaints.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-red-900">
                  Pending Complaints
                </h3>
                <div className="space-y-4 mt-4">
                  {pendingComplaints.map((complaint, index) => (
                    <div
                      key={index}
                      className="bg-yellow-300 p-4 rounded-lg shadow-md"
                    >
                      <h4 className="text-lg font-semibold text-gray-800">
                        {complaint.problem}
                      </h4>
                      <p className="text-sm text-gray-700">
                        {complaint.description}
                      </p>
                      <p className="text-sm text-gray-600">
                        Location: {complaint.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        Department: {complaint.department}
                      </p>
                      <p className="text-lg text-red-700 font-extrabold">
                        Status: {complaint.status}
                      </p>
                      <p className="text-lg text-red-700 font-extrabold">
                        createdAt: {complaint.$createdAt.slice(0,10)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Complaints */}
            {completedComplaints.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-green-900">
                  Completed Complaints
                </h3>
                <div className="space-y-4 mt-4">
                  {completedComplaints.map((complaint, index) => (
                    <div
                      key={index}
                      className="bg-green-300 p-4 rounded-lg shadow-md"
                    >
                      <h4 className="text-lg font-semibold text-gray-800">
                        {complaint.problem}
                      </h4>
                      <p className="text-sm text-gray-700">
                        {complaint.description}
                      </p>
                      <p className="text-sm text-gray-600">
                        Location: {complaint.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        Department: {complaint.department}
                      </p>
                      <p className="text-lg text-green-800 font-extrabold">
                        Status: {complaint.status}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
