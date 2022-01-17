
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

async function checkPerm(password: string, name: string, reqPermition: number) {
  const dbPassword = await prisma.user.findUnique({
    select: {
      password: true,
      permitionId: true,
    },
    where: {
      name: name, //it works fine
    }
  });
  console.log("Password", dbPassword?.password)
  if (dbPassword) {
    const promise = bcrypt.compare(password, dbPassword.password).then(
      (result: any) => {
        
         if (reqPermition <= dbPassword.permitionId) {
           return true;
         }
         else {
           return false;
         }
      },
      (err: any) => {
        return false;
      }
    );
    return await promise;
  }
  else return false;
}

export default checkPerm;