import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express-serve-static-core';
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

async function login(req: Request, res: Response) {
    let name = req.body.name;
    if (name == null) {
        name = undefined;
        res.status(400).json({
            request: {
                type: "login",
                status: "wrong data",
            }
        });
    }
    else {
        const dbPassword = await prisma.user.findUnique({
            select: {
                password: true,
                permitionId: true,
            },
            where: {
                name: name,
            }
        });
        bcrypt.compare(req.body.password, dbPassword?.password).then(
            (result: any) => {
                if (result) {
                    res.status(200).json({
                        request: {
                            type: "login",
                            status: "done",
                        },
                        data: {
                            permitionId: dbPassword?.permitionId
                        }
                    });
                }
                else {
                    res.status(400).json({
                        request: {
                            type: "login",
                            status: "wrong data",
                        }
                    });
                }
            },
            (err: any) => {
                res.status(400).json({
                    request: {
                        type: "login",
                        status: "wrong data",
                    }
                });
            }
        );
    }
}

export default login;