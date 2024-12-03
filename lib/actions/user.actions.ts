"use server";
import { ID } from "node-appwrite";
import { users, account, databases } from "../appwrite.config";
import { ZodEnum } from "zod";
import { Query } from "node-appwrite";

declare interface createuserparams {
  username: string;
  Email: string;
  phoneno: string;
  ID: string;
  Password: string;
}
declare interface loginuser {
  Email: string;
  Password: string;
}
export const createUser = async (user: createuserparams) => {
  try {
    const result = await account.create(
      user.ID,
      user.Email,
      user.Password,
      user.username
    );
    return result;
  } catch (error: any) {
    return error;
  }
};
//login user  using email and password
export const loginuser = async (user1: loginuser) => {
  try {
    const user=await account.createEmailPasswordSession(user1.Email,user1.Password);
    if(user)
    {
      console.log(user);
      return user;
      
    }
  } catch (error:any) {
    console.log("error  creating email session ",error.message|| error);
    
  }
};
//create complain  and further u ahve to add the ownerid dynamic
export const createcompalin = async (complain: {
  problem: string;
  discription: string;
  location: string;
  department: string;
  owner_id:string;
}) => {

  try {
    console.log(complain);
    const result = await databases.createDocument(
      process.env.DATABASE_ID as string, //database_id
      process.env.COMPLAIN_ID as string, // collectionId
      ID.unique(), // documentId
      {
        problem: complain.problem,
        discription: complain.discription,
        owner_id: complain.owner_id,
        department:complain.department,
        location: complain.location,
      }
    );
    console.log("Document Created:", result);
    return result;
  } catch (error:any) {
    console.error("Error creating document:", error.message || error);
    return error;
  }
};
//getuser based on id
export const getuser=async (id:string)=>{
  try {
    const user=users.get(id);
    console.log(user);
    return user;
  } catch (error) {
    console.log("there is any error coming in getting user",error);
    return null;
    
  }
}
//getdoucumnet
export async function getComplaintsByUserId(id: string) {
  try {
    const databaseId = process.env.DATABASE_ID as string; // Your Appwrite database ID
    const collectionId = process.env.COMPLAIN_ID as string; // Your collection ID

    // Query documents where owner_id matches the user_id
    const response = await databases.listDocuments(databaseId, collectionId,[
      Query.equal('owner_id', id)
  ]);

    return response.documents; // List of complaints
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw new Error("Failed to fetch complaints.");
  }
}
