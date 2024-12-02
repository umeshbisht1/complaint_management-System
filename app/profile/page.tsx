"use client"
import React, { useState } from 'react';

type Complaint = {
  id: number;
  title: string;
  status: 'completed' | 'pending';
};

type User = {
  id: number;
  username: string;
  email: string;
  phoneNo: string;
  role: string;
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: 1,
    username: 'John Doe',
    email: 'john.doe@example.com',
    phoneNo: '123-456-7890',
    role: 'Admin',
  });

  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: 1, title: 'Broken AC', status: 'completed' },
    { id: 2, title: 'WiFi not working', status: 'pending' },
    { id: 3, title: 'Water leakage', status: 'completed' },
    { id: 4, title: 'Electricity outage', status: 'pending' },
  ]);

  const handleUpdate = () => {
    alert('Update functionality is not implemented yet!');
  };

  const completedComplaints = complaints.filter((c) => c.status === 'completed');
  const pendingComplaints = complaints.filter((c) => c.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-gray-600 font-medium">Username</label>
            <p className="text-gray-800">{user.username}</p>
          </div>
          <div>
            <label className="text-gray-600 font-medium">Email</label>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div>
            <label className="text-gray-600 font-medium">Phone Number</label>
            <p className="text-gray-800">{user.phoneNo}</p>
          </div>
          <div>
            <label className="text-gray-600 font-medium">Role</label>
            <p className="text-gray-800">{user.role}</p>
          </div>
          <div>
            <label className="text-gray-600 font-medium">ID</label>
            <p className="text-gray-800">{user.id}</p>
          </div>
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Update User Details
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Complaints</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-green-100 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-green-800">Completed</h3>
            <ul className="mt-2 space-y-2">
              {completedComplaints.map((c) => (
                <li
                  key={c.id}
                  className="bg-white p-2 rounded-md shadow-sm border border-green-300"
                >
                  {c.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-yellow-800">Pending/Processing</h3>
            <ul className="mt-2 space-y-2">
              {pendingComplaints.map((c) => (
                <li
                  key={c.id}
                  className="bg-white p-2 rounded-md shadow-sm border border-yellow-300"
                >
                  {c.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
