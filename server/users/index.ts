import { Express } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import { newUser, getAll, deleteUser, login } from "./functions";
import sendMail from "./sendMail";

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

    app.get('/users/mail', (req, res) =>{
      sendMail("joschka4@gmx.de", "ABC123");
      res.status(200).json({
        cool: "cool",
      })
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

    app.post('/users/login', (req, res) => {
      login(req, res)
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

  }

export default users;