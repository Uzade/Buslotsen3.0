import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express-serve-static-core';
const prisma = new PrismaClient();

async function getAll(res: Response) {

    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true
      }
    })
    res.status(200).json({
      data: allUsers
    });
  }

  export default getAll;