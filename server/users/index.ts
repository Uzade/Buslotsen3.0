import { Express } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import { newUser, getAll, deleteUser, getPassword } from "./functions";

function users(app: Express, prisma: PrismaClient){

    app.delete('/users/delete',(req, res) => {
      deleteUser(req, res)
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      });
    });

    app.post('/users/new', (req, res) => {
      newUser(req, res)
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      });
    });
  
    app.get('/users/all', (req, res) => {
      getAll(res)
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      });
      
    });

    app.get('/users/password/:id', (req, res) => {
      getPassword(res, Number(req.params.id))
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      });
      
    });
  }

export default users;