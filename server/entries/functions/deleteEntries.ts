import { PrismaClient } from "@prisma/client";
import checkPerm from "../../users/permition";
import { Request, Response } from 'express-serve-static-core';
const prisma = new PrismaClient()

async function deleteEntry(req: Request, res: Response) {
    if (!req.body.requestor.password || !req.body.requestor.name) {
        res.status(400).json({
            request: {
                type: "deleteEntry",
                status: "no permition",
            },
            message: "You specified the wrong login credentials."
        });
    }
    else if (await checkPerm(req.body.requestor.password, req.body.requestor.name, 1)) {
        const entry = await prisma.entry.findUnique({
            where: {
                id: req.body.id,
            },
        })

        if (entry == null) {
            res.status(400).json({
                request: {
                    type: "deleteEntry",
                    status: "not found",
                },
                message: "You didn't specify a valid id."
            });
        }
        //TODO check for admin status, when admin is added
        else if (req.body.userId != entry?.authorId) {
            res.status(401).json({
                request: {
                    type: "deleteEntry",
                    status: "not allowed",
                },
                message: "You are neither to author nor the admin!"
            });
        }
        else {
            const deleteEntry = await prisma.entry.delete({
                where: {
                    id: req.body.id,
                },
            });
            res.status(200).json({
                request: {
                    type: "deleteEntry",
                    status: "done",
                },
                data: deleteEntry
            })
        }
    }
    else {
        res.status(400).json({
            request: {
                type: "deleteEntry",
                status: "no permition",
            },
            message: "You specified the wrong login credentials."
        });
    }
}

export default deleteEntry;
