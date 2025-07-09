import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import prisma from "src/prisma";


@Injectable()
export class EmployeeService {
    async addEmployee(data: Prisma.EmployeeCreateInput) {
        await prisma.employee.create({ data })
    }
}