import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compareSync } from "bcryptjs";
import prisma from "src/prisma";



@Injectable()
export class AdminService {
    // This service can be extended with methods to handle admin-related logic
    // For example, you could add methods to manage users, roles, or other admin tasks

    async getAdminData(): Promise<string> {
        // Placeholder for admin data retrieval logic
        return "Admin data retrieved successfully";
    }

    async performAdminTask(task: string): Promise<string> {
        // Placeholder for performing an admin task
        return `Admin task '${task}' performed successfully`;
    }

    async login(username: string, password: string): Promise<string> {
        const user = await prisma.admin.findFirst({
            where: {
                Username: username,
            }
        })
        if (!user) {
            throw new UnauthorizedException("Invalid username or password");
        }
        if (!compareSync(password, user.Password)) {
            throw new UnauthorizedException("Invalid username or password");
        }
        return "Login successful";
    }
}