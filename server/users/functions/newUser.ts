import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express-serve-static-core';
import checkPerm from '../permition';
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

async function newUser(req: Request, res: Response) {
  if (!req.body.requestor.password || !req.body.requestor.name) {
    res.status(401).json({
      request: {
        type: "getAll",
        status: "no permition",
      },
      message: "You specified the wrong login credentials."
    });
  }
  else if (!req.body.password || !req.body.name || !req.body.email || !req.body.permitionId) {
    res.status(400).json({
      request: {
        type: "newUser",
        status: "missing parameter",
      }
    })
  }
  else {
    let permition = await checkPerm(req.body.requestor.password, req.body.requestor.name, 1);
    if (permition) {
      const hash = bcrypt.hash(req.body.password, 10);
      console.log(await hash);
      const newUser = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: await hash,
          permitionId: req.body.permitionId,
        },
      });
      res.status(201).json({
        request: {
          type: "newUser",
          status: "done",
        },
        data: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          permitionId: newUser.permitionId
        }
      })
    }
    else{
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

export default newUser;