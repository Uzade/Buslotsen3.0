import { PrismaClient } from "@prisma/client";

import { Request, Response } from 'express-serve-static-core';

const prisma = new PrismaClient()

export async function getAll(res: Response){

    const allEntries = await prisma.entry.findMany()
    res.status(200).json({ 
      data: allEntries
    });
}

export async function newEntry(req: Request, res: Response){
    //console.log(req.body);
    const newEntrie = await prisma.entry.create({
      data: {
        title: req.body.title,
        authorId: req.body.authorId,
      },
    });
}