import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import prisma from "src/prisma";


@Injectable()
export class AdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization?.split(" ")[1];
            if (!token) {
                return false;
            }
            const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, type: string };
            if (!data)
                return false;

            if (data.type === "admin") {
                const user = await prisma.admin.findFirst({
                    where: {
                        id: parseInt(data.id),
                    }
                })

                if (!user) {
                    return false;
                }
            }
            else {
                return false;
            }

            return true;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) throw new UnauthorizedException("Invalid token");
            throw new BadRequestException("Invalid authentication data");
        }
    }
}