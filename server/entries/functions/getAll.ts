
import { PrismaClient } from "@prisma/client";
import checkPerm from "../../users/permition";
import { Request, Response } from 'express-serve-static-core';
const prisma = new PrismaClient()

async function getAll(req: Request, res: Response) {
    let value = await checkPerm(req.body.requestor.password, req.body.requestor.name, 0);
    console.log(req.body.requestor.password);
    console.log(value)
    if (!req.body.requestor.password || !req.body.requestor.name) {
        res.status(400).json({
            request: {
                type: "getAll",
                status: "no permition",
            },
            message: "You specified the wrong login credentials."
        });
    }
    else if (value) {
        const allEntries = await prisma.entry.findMany({
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            },
        })
        res.status(200).json({
            request: {
                type: "getAll",
                status: "no permition",
            },
            data: allEntries
        });
    }
    else {
        console.log("Hier")
        res.status(400).json({
            request: {
                type: "getAll",
                status: "no permition",
            },
            message: "You specified the wrong login credentials."
        });
    }
}

export default getAll;

