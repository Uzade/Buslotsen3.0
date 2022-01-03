
import { PrismaClient } from "@prisma/client";

import { Request, Response } from 'express-serve-static-core';

const prisma = new PrismaClient();

export async function getPassword(res: Response, id: number) {
  if (isNaN(id)) {
    res.status(400).json({
      request: {
        type: "getPassword",
        status: "not found",
        id: id,
      },
      message: "You didn't specify a valid id."
    });
  } else {
    const password = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        password: true
      }
    });
    if (password == null) {
      res.status(400).json({
        request: {
          type: "getPassword",
          status: "not found",
          id: id,
        },
        message: "You didn't specify a valid id."
      });
    }
    else {
      res.status(200).json({
        request: {
          type: "getPassword",
          status: "done",
          id: id,
        },
        data: password?.password
      });
    }
  }
}

export async function changePassword(req: Request, res: Response) {
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

export async function deleteUser(req: Request, res: Response) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.body.id,
    },
    include: {
      entries: true
    }
  })

  if (user == null) {
    res.status(400).json({
      request: {
        type: "deleteUser",
        status: "not found",
      },
      message: "You didn't specify a valid id."
    });
  }
  //TODO check for admin status, when admin is added

  else {
    //first delete all asociated posts:
    let x = "0";
    if (user.entries != []) { }
    for (x in user.entries) {
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
      request: {
        type: "deleteUser",
        status: "done",
      },
      data: deleteUser
    })
  }
}

export async function getAll(res: Response) {

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

export async function newUser(req: Request, res: Response) {
  //console.log(req.body);
  const newUser = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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