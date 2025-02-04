import React from 'react';
import Link from 'next/link';

const departments = [
  'IT',
  'Hostel',
  'Fee Cell',
  'Transport',
  'Others'
];

interface PageProps {
  params: {
    adminid: string;
  };
}

export default async function AdminDashboard({ params }: PageProps) {
  const { adminid } = params;

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-6 pb-10"
      style={{ backgroundImage: "url('https://www.gehu.ac.in/assets/GEHU-BTL-b80ef66e.jpg')" }}
    >
      <h1 
        className="text-white mb-[30px]" 
        style={{
          textAlign: 'center',
          color: '#dadada',
          marginBottom: '30px',
          fontSize: '2.5rem'
        }}
      >
        Welcome Admin
      </h1>

      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px'
        }}
      >
        {departments.map((dept) => (
          <Link
            key={dept}
            href={`/Admin/${adminid}/seecomplain/${dept}`}
            style={{
              textDecoration: 'none',
              width: '200px',
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
            }}
          >
            <div 
              style={{
                color: '#333',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}
            >
              {dept}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}