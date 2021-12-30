import { Express } from "express-serve-static-core";
import { PrismaClient } from "@prisma/client";
import { newEntry, getAll, deleteEntry } from "./functions";

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