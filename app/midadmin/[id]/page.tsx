import { getcomplaindepart, getuserbyid } from '@/lib/actions/user.actions';
import React from 'react';
import { use } from 'react';

async function page({ params }: { params: { id: string } }) {
    const { id } = await params;
    let data = "loading";
    let user = null;
    let complain: any = [];
    try {
        user = await getuserbyid(id);
        console.log(user);

        if (user) {
            complain = await getcomplaindepart(user.department);
            if (!complain) {
                data = "Complain not found";
            }
        }
        data = "Complain not found!!!";

    } catch (error) {
        data = "Complain not found";
    }
    const accept=async ()=>{
  alert("complain accepted ")
    }
    const reject=async()=>{
alert("complain resolved")
    }

    return (
        <div className='min-h-screen bg-cover bg-center flex flex-col items-center  p-6 pb-10'
            style={{ backgroundImage: "url('https://www.gehu.ac.in/assets/GEHU-BTL-b80ef66e.jpg')" }}
        >
            <div className='text-center text-3xl font-semibold text-white mb-8'>
                <h1 className='text-red-800'>Welcome Mid_Admin </h1>
                <h3>Complaint Dashboard</h3>
            </div>
            <div className='max-w-4xl mx-auto'>
                {complain ? (
                    complain.map((complainItem: any, index: any) => (
                        <div
                            key={index}
                            className='bg-white p-6 rounded-lg shadow-lg mb-6'
                        >
                            <h2 className='text-2xl font-bold text-gray-800'>
                                {complainItem.problem}
                            </h2>
                            <p className='text-gray-600 mt-2'>
                                <span className='font-semibold'>Description:</span>{' '}
                                {complainItem.discription}
                            </p>
                            <p className='text-gray-600 mt-2'>
                                <span className='font-semibold'>Location:</span>{' '}
                                {complainItem.location}
                            </p>
                            <p className='text-gray-600 mt-2'>
                                <span className='font-semibold'>Status:</span>{' '}
                                <span
                                    className={`$ {
                                        complainItem.status === 'pending'
                                            ? 'bg-yellow-500 text-white'
                                            : 'bg-green-500 text-white'
                                    } rounded-full px-3 py-1 text-sm font-semibold`}
                                >
                                    {complainItem.status}
                                </span>
                            </p>
                            <p className='text-gray-600 mt-2'>
                                <span className='font-semibold'>Owner ID:</span>{' '}
                                {complainItem.owner_id}
                            </p>
                            <p className='text-gray-600 mt-2'>
                                <span className='font-semibold'>Department:</span>{' '}
                                {complainItem.department}
                            </p>

                            {complainItem.status === 'pending' && (
                                <div className='mt-4'>
                                    <button
                                        className='bg-green-500 text-white px-4 py-2 rounded mr-2'
                                    //  onClick={()=>accept()}   
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className='bg-red-500 text-white px-4 py-2 rounded'
                                        // onClick={()=>reject()}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className='text-black text-xl'>{data}...</div>
                )}
            </div>
        </div>
    );
}

async function handleAction(action: string, id: string) {
    try {
        if (action === 'accept') {
            console.log(`Complaint ${id} accepted.`);
            // Perform accept action (e.g., API call to update status)
        } else if (action === 'reject') {
            console.log(`Complaint ${id} rejected.`);
            // Perform reject action (e.g., API call to update status)
        }
    } catch (error) {
        console.error(`Error performing ${action} action:`, error);
    }
}

export default page;

