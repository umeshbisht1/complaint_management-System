"use client"
import React, { useState } from 'react';

const complaints = [
  {
    problem: "Fan is not working",
    description: "Even after calling to Worden, no action has been taken",
    owner_id: "123456789",
    department: "Hostel",
    location: "Sattal Hostel, 2nd floor, Room No 6",
    status: "pending",
    createdAt: "2024-12-01T14:31:40.563+00:00",
  },
  {
    problem: "People are not submitting the bus fee",
    description: "People who are drinking water are not paying the bus fee",
    owner_id: "123456789",
    department: "Hostel",
    location: "Sattal Hostel, 3rd floor",
    status: "completed",
    createdAt: "2024-12-01T15:31:40.563+00:00",
  },
  {
    problem: "Issue with the electrical wiring",
    description: "Even after doing all this stuff, the wires are sparking",
    owner_id: "123456789",
    department: "Maintenance",
    location: "Sattal Hostel, 1st floor",
    status: "pending",
    createdAt: "2024-12-01T16:31:40.563+00:00",
  },
];
type Complaint = {
    problem: string;
    description: string;
    owner_id: string;
    department: string;
    location: string;
    status: string,
    createdAt: string;
  };
const ComplaintList = () => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleComplaintClick = (complaint:Complaint) => {
    setSelectedComplaint(complaint);
  };

  const closePopup = () => {
    setSelectedComplaint(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Complaints</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {complaints.map((complaint, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:bg-gray-100 transition-all"
            onClick={() => handleComplaintClick(complaint)}
          >
            <h3 className="text-xl font-semibold">{complaint.problem}</h3>
            <p className="text-gray-600 text-sm">{complaint.description}</p>
            <p className="text-sm text-gray-400">Location: {complaint.location}</p>
            <p className="text-sm text-gray-400">Status: {complaint.status}</p>
          </div>
        ))}
      </div>

      {/* Pop-up modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold">{selectedComplaint.problem}</h2>
            <p className="text-gray-600 mt-2">{selectedComplaint.description}</p>
            <p className="mt-2">
              <span className="font-semibold">Location:</span> {selectedComplaint.location}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Department:</span> {selectedComplaint.department}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Status:</span> {selectedComplaint.status}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              <span className="font-semibold">Created at:</span> {new Date(selectedComplaint.createdAt).toLocaleString()}
            </p>
            <button
              onClick={closePopup}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintList;
