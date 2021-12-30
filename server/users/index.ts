import { Express } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import { newUser, getAll } from "./functions";

function users(app: Express, prisma: PrismaClient){

    app.post('/users/new', (req, res) => {
      newUser(req, res)
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
        getAll(res)
          .catch((e) => {
            throw e
          })
          .finally(async () => {
            await prisma.$disconnect()
          });
      });
    })
  
    app.get('/users/all', (req, res) => {
      getAll(res)
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      });
      
    });
  }

export default users;