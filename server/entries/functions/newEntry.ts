
import { PrismaClient } from "@prisma/client";
import checkPerm from "../../users/permition";
import { Request, Response } from 'express-serve-static-core';
const prisma = new PrismaClient()


async function newEntry(req: Request, res: Response) {
    if (!req.body.requestor.password || !req.body.requestor.name) {
        res.status(400).json({
            request: {
                type: "getAll",
                status: "no permition",
            },
            message: "You specified the wrong login credentials."
        });
    }
    else if (await checkPerm(req.body.requestor.password, req.body.requestor.name, 0)) {
        if (!req.body.authorId) {
            console.log(req.body);
            res.status(400).json({
                request: {
                    type: "getAll",
                    status: "missing parameters",
                },
                message: "You have to specify title and authorId."
            });
        }
        else {
            const newEntry = await prisma.entry.create({
                data: {
                    suspect: req.body.suspect,
                    school: req.body.school,
                    class: req.body.class,
                    time: new Date(req.body.time),
                    location: req.body.location,
                    incident: req.body.incident,
                    authorId: req.body.authorId,

                },
            });
            res.status(201).json({
                request: {
                    type: "newEntry",
                    status: "done",
                },
                data: newEntry
            })
        }
    }
    else {
        res.status(400).json({
            request: {
                type: "getAll",
                status: "no permition",
            },
            message: "You specified the wrong login credentials."
        });
    }
}

export default newEntry;