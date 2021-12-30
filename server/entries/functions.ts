import { PrismaClient } from "@prisma/client";

import { Request, Response } from 'express-serve-static-core';

const prisma = new PrismaClient()

export async function deleteEntry(req: Request, res: Response){
    const entry = await prisma.entry.findUnique({
        where: {
          id: req.body.id,
        },
      })

    if(entry == null){
        res.status(400).json({
            request:{
                type: "deleteEntry",
                status: "not found",
              },
            message: "You didn't specify a valid id."
        });
    }
    //TODO check for admin status, when admin is added
    else if(req.body.userId != entry?.authorId){
        res.status(401).json({
            request:{
                type: "deleteEntry",
                status: "not allowed",
              },
            message: "You are neither to author nor the admin!"
        });
    }
    else{
        const deleteEntry = await prisma.entry.delete({
            where: {
                id: req.body.id,
            },
        });
        res.status(200).json({
            request:{
                type: "deleteEntry",
                status: "done",
              },
              data: deleteEntry
        })
    }
}

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