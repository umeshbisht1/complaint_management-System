"use server";
import { ID } from "node-appwrite";
import { users, account, databases } from "../appwrite.config";
import { ZodEnum } from "zod";

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
export const loginuser = async (user1: loginuser) => {
  try {
    const user = await users.get("123456789");
    return user;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};
export const createcompalin = async (complain: {
  problem: string;
  discription: string;
  location: string;
  department: string;
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
        owner_id: "0987654321",
        department:complain.department,
        location: complain.location,
      }
    );
// 123456789
    console.log("Document Created:", result);
    return result;
  } catch (error:any) {
    console.error("Error creating document:", error.message || error);
    return error;
  }
};
