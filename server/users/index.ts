import { Express } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import { newUser, getAll } from "./functions";

function users(app: Express){

    app.post('/new', (req, res) => {
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
  
    app.get('/', (req, res) => {
      getAll(res)
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      });
      
    });
  }
const prisma = new PrismaClient();

export default users;