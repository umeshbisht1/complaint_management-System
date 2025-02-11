"use client"; 

import { chnagestatus, getcomplaindepart, getuserbyid } from "@/lib/actions/user.actions";
import React, { useEffect, useState} from "react";
import { useParams } from 'next/navigation'
import Image from "next/image";


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
}

interface User {
    Name: string;
    Email: string;
    user_id: string;
    phoneno: string;
    role: "mid_admin" | "admin" | "user";
    department: string;
}

export default function Page() {
    const {id }= useParams<{ id:string; }>();
    //console.log(id);
    
    const [complaints, setComplaints] = useState<Complaint[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const user: User = await getuserbyid(id);
                if (user) {
                    const fetchedComplaints = await getcomplaindepart(user.department, "resolved");
                    setComplaints(fetchedComplaints || []);
                }
            } catch (error) {
                console.error("Error fetching complaints:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, [id]);


    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col items-center p-6 pb-10"
        style={{
          backgroundImage:
            "url('https://www.gehu.ac.in/assets/GEHU-BTL-b80ef66e.jpg')",
        }}
        >
            <div className="w-full flex justify-between items-center mb-8 px-6">
               <Image
                          src="/assets/download.jpg"
                          height={1000}
                          width={1000}
                          alt="logo"
                          className="mb-2 h-10 w-fit"
                        />
                
            </div>

            <div className="text-center text-3xl font-semibold text-white mb-8">
                <h1 className="text-red-800">Welcome Mid_Admin</h1>
                <h3>Complaint Dashboard</h3>
                <h4>Update The  Complaints Status</h4>
            </div>

            <div className="max-w-4xl mx-auto">
                {loading ? (
                    <div className="text-black text-xl">Loading...</div>
                ) : complaints && complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <div key={complaint.id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{complaint.problem}</h2>
                            <p className="text-gray-600 mt-2">
                                <span className="font-semibold">Description:</span> {complaint.discription}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <span className="font-semibold">Location:</span> {complaint.location}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <span className="font-semibold">Status:</span> {complaint.status}
                            </p>
                            <p className="text-gray-600 mt-2">
                                <span className="font-bold ">updatedAt:</span> {complaint.updatedAt.slice(0,10)}
                            </p>

                            
                            {complaint.status === "resolved" && (
                                <div className="mt-4">
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                       
                                    >
                                       Resolved
                                    </button>
                                   
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-black text-xl">No complaints found.</div>
                )}
            </div>
        </div>
    );
}
