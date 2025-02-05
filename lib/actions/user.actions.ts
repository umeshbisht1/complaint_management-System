"use server";
import { ID } from "node-appwrite";
import { users, account, databases } from "../appwrite.config";

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
    // const result = await account.create(
    //   user.ID,
    //   user.Email,
    //   user.Password,
    //   user.username
    // );
    console.log(user);

    const user1 = await databases.createDocument(
      process.env.DATABASE_ID as string, 
      process.env.USER_ID as string, 
      ID.unique(),
      {
        Name: user.username,
        Email: user.Email,
        user_id: user.ID,
        phoneno: user.phoneno,
        role: "user",
        Password: user.Password,
      }
    );
    console.log(user1);
  if(user1)
    return user1;
  else
  return null;
  } catch (error) {
    console.log(error);

    return error;
  }
};
//login user  using email and password
export const loginuser = async (user1: loginuser) => {
  try {
    const user = await account.createEmailPasswordSession(
      user1.Email,
      user1.Password
    );
    if (user) {
      const databaseId = process.env.DATABASE_ID as string; // Your Appwrite database ID
    const collectionId = process.env.USER_ID as string; // Your collection ID

    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("user_id", user.userId),
    ]);
      if(response.total>0)
      {
        console.log(response);
        
  return  response.documents[0];
      }
      return null;
    }
    return null;
  } catch (error) {
    console.log("error  creating email session ", error);
  }
};
//create complain  and further u ahve to add the ownerid dynamic
export const createcompalin = async (complain: {
  problem: string;
  discription: string;
  location: string;
  department: string;
  owner_id: string;
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
        department: complain.department,
        location: complain.location,
      }
    );
    console.log("Document Created:", result);
    return result;
  } catch (error) {
    console.error("Error creating document:", error);
    return error;
  }
};
//getuser based on id
export const getuser = async (id: string) => {
  try {
    const user = users.get(id);

    return user;
  } catch (error) {
    console.log("there is any error coming in getting user", error);
    return null;
  }
};
//getdoucumnet
export async function getComplaintsByUserId(id: string) {
  try {
    const databaseId = process.env.DATABASE_ID as string; // Your Appwrite database ID
    const collectionId = process.env.COMPLAIN_ID as string; // Your collection ID

    // Query documents where owner_id matches the user_id
    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("owner_id", id),
    ]);

    return response.documents; // List of complaints
  } catch (error) {
    console.error("Error fetching complaints:", error);
    throw new Error("Failed to fetch complaints.");
  }
}
declare interface changedata {
  userId: string;
  department: string;
  role: string;
}
export const changeu = async (data: changedata) => {
  try {
    const databaseId = process.env.DATABASE_ID as string; // Your Appwrite database ID
    const collectionId = process.env.USER_ID as string; // Your collection ID

    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("user_id", data.userId),
    ]);

    if (response.total > 0) {
      const result = await databases.updateDocument(
        databaseId,
        collectionId,
        response.documents[0].$id as string,
        {
          role: data.role,
          department:data.department
        }
      );

      return result;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user.");
    
  }
};
declare interface created {
  department: string;
  
}
export const createdepart=async(data:created)=>{
 try {
  const databaseId = process.env.DATABASE_ID as string; // Your Appwrite database ID
    const collectionId = process.env.DEPARTMENT_ID as string; // Your collection ID
  const depart=await databases.createDocument(
    databaseId as string,
    collectionId as string,ID.unique(),{
    departname:data.department
    }
  )
  console.log(depart);
  return depart;

 } catch (error) {
  console.log(error ||"error coccured during creating department");
  return error;
  
 }
}
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

export const getcomplaindepart = async (depart: string): Promise<Complaint[]> => {
  try {
    const databaseId = process.env.DATABASE_ID as string;
    const collectionId = process.env.COMPLAIN_ID as string;

    // Fetch documents where "department" matches "depart"
    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("department", depart),
    ]);

    if (response.total > 0) {
      return response.documents.map((doc) => ({
        id: doc.$id,
        problem: doc.problem,
        discription: doc.discription,
        owner_id: doc.owner_id,
        department: doc.department,
        location: doc.location,
        status: doc.status,
        createdAt: doc.$createdAt,
        updatedAt: doc.$updatedAt,
        permissions: doc.$permissions || [],
        databaseId: doc.$databaseId,
        collectionId: doc.$collectionId,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return [];
  }
};
interface User {
  Name: string;
  Email: string;
  user_id: string;
  phoneno: string;
  role: "mid_admin" | "admin" | "user" ; // Adjust roles as needed
  Password: string;
  department: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export const getuserbyid = async (id: string): Promise<User | null> => {
  try {
    const databaseId = process.env.DATABASE_ID as string;
    const collectionId = process.env.USER_ID as string;

    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("user_id", id),
    ]);

    if (response.total > 0) {
      const doc = response.documents[0];
      return {
        Name: doc.Name,
        Email: doc.Email,
        user_id: doc.user_id,
        phoneno: doc.phoneno,
        role: doc.role,
        Password: doc.Password,
        department: doc.department,
        $id: doc.$id,
        $createdAt: doc.$createdAt,
        $updatedAt: doc.$updatedAt,
        $permissions: doc.$permissions || [],
        $databaseId: doc.$databaseId,
        $collectionId: doc.$collectionId,
      };
    }

    return null; // Return `null` instead of an empty array if no user is found
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Return `null` in case of an error
  }
};