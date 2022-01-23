import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express-serve-static-core';
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

async function newUser(req: Request, res: Response) {
    //console.log(req.body);
    const hash = bcrypt.hash(req.body.password, 10);
    console.log(await hash);
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: await hash,
        permitionId: req.body.permitionID,
      },
    });
    res.status(201).json({
      request: {
        type: "newUser",
        status: "done",
      },
      data: newUser
    })
  }

  export default newUser;