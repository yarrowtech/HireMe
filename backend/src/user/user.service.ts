import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { decryptUserData } from "src/utils/encryption";
import prisma from "src/prisma";

@Injectable()
export class UserService {

    async getUserDetails(authToken: string, metadata: string): Promise<Object> {
        const ok = jwt.verify(authToken, process.env.JWT_SECRET!);
        if (!ok) {
            throw new UnauthorizedException("Invalid token");
        }
        const { userId, type} = decryptUserData(metadata)
        if (type === "admin") {
            const data = await prisma.admin.findFirst({
                where: {
                    id: parseInt(userId),
                },
                select: {
                    Username: true,
                    Email: true,
                }
            })
            if (!data) {
                throw new UnauthorizedException("User not found");
            }
            return data
        }
        else throw new HttpException("Invalid metadata", 400);
    }
}