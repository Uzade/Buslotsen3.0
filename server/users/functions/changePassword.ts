import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express-serve-static-core';
const prisma = new PrismaClient();

async function changePassword(req: Request, res: Response) {
    //get resetKey
    const resetKey = await prisma.user.findUnique({
      select: {
        resetKey: true,
      },
      where: {
        id: req.body.id,
      }
    })
    if(resetKey?.resetKey == null){
      res.status(400).json({
        request: {
          type: "changePassword",
          status: "invalid id",
        }
      })
    }
    //test if resetKey got assigned
    else if(resetKey?.resetKey == "None"){
      res.status(401).json({
        request: {
          type: "changePassword",
          status: "you must first request a resetKey",
        }
      })
    }
    else if(resetKey?.resetKey != req.body.resetKey){
      res.status(400).json({
        request: {
          type: "changePassword",
          status: "wrong resetKey",
        }
      })
    }
    else{
      const user = await prisma.user.update({
        where: {
          id: req.body.id
        },
        data: {
          password: req.body.password1,
          resetKey: "None"
        }
      })
    }
  }

  export default changePassword;