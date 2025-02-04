import { getcomplaindepart } from "@/lib/actions/user.actions";
import React from "react";

interface Complaint {
  id: string;
  problem: string;
  discription: string;
  owner_id: string;
  department: string;
  location: string;
  status: "pending" | "resolved" | "in-progress";
  createdAt: string;
  updatedAt: string;
  permissions: string[];
  databaseId: string;
  collectionId: string;
}
type Params = Promise<{ name: string }>
async function Page({ params }: { params: Params }) {
    const { name } = await params;
    
  
  let data = "Loading...";
  let complain: Complaint[]=[];

  try {
    complain = await getcomplaindepart(name);
    if (!complain || complain.length === 0) {
      data = "No Complaints Found!";
    }
  } catch (error) {
    console.error(error);
    data = "Error fetching complaints!";
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-6 pb-10"
      style={{
        backgroundImage: "url('https://www.gehu.ac.in/assets/GEHU-BTL-b80ef66e.jpg')",
      }}
    >
      <div className="text-center text-3xl font-semibold text-white mb-8">
        <h1 className="text-red-800">Welcome Admin</h1>
        <h3>Complaint Dashboard</h3>
      </div>
      <div className="max-w-4xl mx-auto">
        {complain && complain.length > 0 ? (
          complain.map((complainItem) => (
            <div key={complainItem.id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{complainItem.problem}</h2>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Description:</span> {complainItem.discription}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Location:</span> {complainItem.location}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${
                    complainItem.status === "pending"
                      ? "bg-yellow-500"
                      : complainItem.status === "resolved"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  } text-white rounded-full px-3 py-1 text-sm font-semibold`}
                >
                  {complainItem.status}
                </span>
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Owner ID:</span> {complainItem.owner_id}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Department:</span> {complainItem.department}
              </p>
            </div>
          ))
        ) : (
          <div className="text-black text-xl">{data}</div>
        )}
      </div>
    </div>
  );
}

export default Page;
