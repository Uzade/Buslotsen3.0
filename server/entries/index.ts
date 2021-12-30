import { Express } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import { newEntry, getAll } from "./functions";

function entries(app: Express, prisma: PrismaClient){
    
    app.post('/entries/new', (req, res) => {
        newEntry(req, res)
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
    
    app.get('/entries/all', (req, res) => {
        getAll(res)
        .catch((e) => {
          throw e
        })
        .finally(async () => {
          await prisma.$disconnect()
        });
        
      });

}

export default entries;