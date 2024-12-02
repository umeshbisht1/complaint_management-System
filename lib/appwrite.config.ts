import * as sdk from 'node-appwrite'
export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  USER_ID,
  COMPLAIN_ID,
  DEPARTMENT_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;
const client = new sdk.Client();
client
    .setEndpoint(`${process.env.NEXT_PUBLIC_ENDPOINT}`)
    .setProject('674c2db6000f357936b6')
    .setKey('standard_e88704f002038152f59d3f68691e5d235e2370d42839a246684641a0051243907be3d35a810038093e3e8c7d1b3bd493bff7ce966ede542aa92e0a7b7fd2e569072daf759b8a56ced3f0d7240cf22f773d4d78356c800200ebb054764296274e16ed361ec48882c4e4e27df1ca3a67952862ba53f7698f190440ae78744676ac');
  
export const databases=new sdk.Databases(client);
export const account=new sdk.Account(client);
export const message=new sdk.Messaging(client);
export const users = new sdk.Users(client);


