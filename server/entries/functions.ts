import { PrismaClient } from "@prisma/client";

import { Request, Response } from 'express-serve-static-core';

const prisma = new PrismaClient()

export async function getAll(res: Response){

    const allEntries = await prisma.entry.findMany({
        include: {
          author: {
              select:{
                  name: true
              }
          }
        },
      })
    res.status(200).json({ 
      data: allEntries
    });
}

export async function newEntry(req: Request, res: Response){
    //console.log(req.body);
    const newEntry = await prisma.entry.create({
      data: {
        title: req.body.title,
        authorId: req.body.authorId,
      },
    });
    res.status(201).json({
        request:{
            type: "newEntry",
            status: "done",
          },
        data: newEntry
    })
}