import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import prisma from 'src/prisma';
import { CreateEmployeeDto } from './dto/employeeCred.dto';
import { AccessLevel } from '@prisma/client';
import { hashSync } from 'bcryptjs';

@Injectable()
export class EmployeeService {
  private async generateUniqueUsername(name: string): Promise<string> {
    let username: string;
    const prefix = 'emp';
    const namePrefix = name.substring(0, 4).toLowerCase();
    let counter = 1;
    do {
      username = `${prefix}-${namePrefix}${counter}`;
      counter++;
    } while (
      await prisma.employee.findFirst({ where: { Username: username } })
    );
    return username;
  }

  async addEmployee(createEmployeeDto: CreateEmployeeDto) {
    const username = await this.generateUniqueUsername(createEmployeeDto.Name);
    const {
      authUserId,
      AccessLevel: accessLevelString,
      ...employeeData
    } = createEmployeeDto;

    const accessLevelKey = accessLevelString.toUpperCase();
    const accessLevelEnum = AccessLevel[accessLevelKey];

    await prisma.employee.create({
      data: {
        ...employeeData,
        Username: username,
        Password: hashSync(createEmployeeDto.Password, 10),
        SuperiorId: authUserId,
        AccessLevel: accessLevelEnum,
      },
    });
  }

  async getEmployeeDetails(
    employeeId: number,
  ): Promise<Prisma.EmployeeGetPayload<{ select: { Password: false } }>> {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      omit: {
        Password: true,
        CreatedAt: true,
        UpdatedAt: true,
        SuperiorId: true,
      },
      include: {
        Company: {
          select: {
            CompanyName: true,
            Email: true,
            Address: true,
            Contact: true,
          },
        }
      }
    });

    if (!employee) {
      throw new UnauthorizedException('Invalid token');
    }

    return employee;
  }

  async markAttendance(employeeId: number, present: boolean): Promise<void> {
    const date = new Date();
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new UnauthorizedException('Invalid employee ID');
    }
    const existingAttendances = await prisma.attendance.findMany({
      where: {
        EmployeeId: employeeId,
      },
    });
    const existingAttendance = existingAttendances?.find(attendance => {
      const attendanceDate = new Date(attendance.Date);
      return attendanceDate.getDate() === date.getDate() &&
             attendanceDate.getMonth() === date.getMonth() &&
             attendanceDate.getFullYear() === date.getFullYear();
    });
    
    if (existingAttendance) {
      await prisma.attendance.update({
        where: { id: existingAttendance.id },
        data: { Present: present },
      });
    } else {
      await prisma.attendance.create({
        data: {
          EmployeeId: employeeId,
          Date: date,
          Present: present,
        },
      });
    }
  }

  async getAttendance(employeeId: number): Promise<{Date: Date, Present: boolean}[]> {
    const attendance = await prisma.attendance.findMany({
      where: { EmployeeId: employeeId },
      select: {
        Date: true,
        Present: true,
      }
    });
    return attendance;
  }
}
