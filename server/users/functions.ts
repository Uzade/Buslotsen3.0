
import { PrismaClient } from "@prisma/client";

import { Request, Response } from 'express-serve-static-core';
import users from ".";

const prisma = new PrismaClient();

export async function deleteUser(req: Request, res: Response){
  const user = await prisma.user.findUnique({
      where: {
        id: req.body.id,
      },
      include:{
        entries: true
      }
    })

  if(user == null){
      res.status(400).json({
          request:{
              type: "deleteUser",
              status: "not found",
            },
          message: "You didn't specify a valid id."
      });
  }
  //TODO check for admin status, when admin is added
  
  else{
    //first delete all asociated posts:
    let x = "0";
    if(user.entries != []){}
    for(x in user.entries){
      await prisma.entry.delete({
        where: {
            id: user.entries[x].id
        },
    });
    }
      const deleteUser = await prisma.user.delete({
          where: {
              id: req.body.id,
          },
      });
      res.status(200).json({
          request:{
              type: "deleteUser",
              status: "done",
            },
            data: deleteUser
      })
  }
}

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