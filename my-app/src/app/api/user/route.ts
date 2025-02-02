import { NextResponse } from "next/server";
import {db} from '../../../lib/db'
import {hash} from 'bcrypt';
import * as z from 'zod';


//Define a schema for input validation 
const userSchema = z.object({
    username: z.string(),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
      number: z
      .string(),
  });
  

export async function POST (req: Request) {
    try{
        const body = await req.json();
        const {email, username, password} = userSchema.parse(body) ;


// If email already exists
        const existingUserByEmail = await db.user.findUnique({
            where :{email: email}

        });
        if (existingUserByEmail){
            return NextResponse.json ({user:null, message: "User with this email already exits"}, {status: 409})
        }
        

// If username already exists
const existingUserByUsername = await db.user.findUnique({
    where :{username: username}

});
if (existingUserByUsername){
    return NextResponse.json ({user:null, message: "User with this username already exits"}, {status: 408})
}
const hashedPassword = await hash(password, 10)
const newUser = await db.user.create({
    data: {
        email, 
        username,
        password : hashedPassword
    }
})

        return NextResponse.json({user: newUser, message: 'New User Created'},{status:201});


    } catch(ERROR){
        return NextResponse.json({message: "Something went wrong"}, {status:500})

    }
}
