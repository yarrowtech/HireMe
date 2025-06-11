import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import prisma from "src/prisma";
import { decryptUserData } from "src/utils/encryption";


@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization?.split(" ")[1];
            const metadata = request.headers.metadata;
            if (!token) {
                return false;
            }
            if (!jwt.verify(token, process.env.JWT_SECRET!))
                return false;

            if (!metadata || typeof metadata !== "string") {
                return false;
            }

            const { userId, type } = decryptUserData(metadata);

            if (type !== "admin") {
                return false;
            }

            const user = prisma.admin.findFirst({
                where: {
                    id: parseInt(userId),
                }
            })

            if (!user) {
                return false;
            }

            return true
        }catch (error) {
            throw new BadRequestException("Invalid authentication data");
        }
    }
}