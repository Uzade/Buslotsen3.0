
import { PrismaClient } from "@prisma/client";

import { Request, Response } from 'express-serve-static-core';

const prisma = new PrismaClient();

export async function getAll(res: Response) {
  
    const allUsers = await prisma.user.findMany()
    res.status(200).json({ 
      data: allUsers
    });
  }
  
export async function newUser(req: Request, res: Response){
    //console.log(req.body);
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.status(201).json({
      request:{
        type: "newUser",
        status: "done",
      },
      data: newUser
  })
}