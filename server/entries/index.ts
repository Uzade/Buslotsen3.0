import { Express } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import deleteEntry from "./functions/deleteEntries";
import getAll from "./functions/getAll";
import newEntry from "./functions/newEntry";

function entries(app: Express, prisma: PrismaClient){
    
    app.delete('/entries/delete', (req, res) =>{
        deleteEntry(req, res)
        .catch((e) => {
            throw e
        })
        .finally(async () => {
            await prisma.$disconnect()
        });
    })

    app.post('/entries/new', (req, res) => {
        newEntry(req, res)
        .catch((e) => {
          throw e
        })
        .finally(async () => {
          await prisma.$disconnect()
        });
      })
    
    app.post('/entries/all', (req, res) => {
        getAll(req, res)
        .catch((e) => {
          throw e
        })
        .finally(async () => {
          await prisma.$disconnect()
        });
        
      });

}

export default entries;