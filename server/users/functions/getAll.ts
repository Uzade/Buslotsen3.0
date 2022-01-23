import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express-serve-static-core';
import checkPerm from "../permition";
const prisma = new PrismaClient();

async function getAll(req: Request, res: Response) {

  if (!req.body.requestor.password || !req.body.requestor.name) {
    res.status(401).json({
      request: {
        type: "getAll",
        status: "no permition",
      },
      message: "You specified the wrong login credentials."
    });
  }
  else {
    let value = await checkPerm(req.body.requestor.password, req.body.requestor.name, 1);
    if (value) {
      const allUsers = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          permitionId: true
        }
      })
      res.status(200).json({
        data: allUsers
      });
    }
    else {
      res.status(401).json({
        request: {
          type: "getAll",
          status: "no permition",
        },
        message: "You specified the wrong login credentials."
      });
    }
  }

}

export default getAll;