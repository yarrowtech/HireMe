import { Controller, HttpCode, UseFilters, Post, Get, UseInterceptors, Catch, BadRequestException, ExceptionFilter, ArgumentsHost, UseGuards, Body, Req, ValidationPipe, UnauthorizedException, Param  } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/employeeCred.dto";
import { Request, Response } from "express";
import { unlinkSync } from "node:fs";
import { diskStorage } from "multer";
import { extname } from "node:path";
import { v4 as uuidv4 } from "uuid";
import { CompanyAdminGuard, CompanyGuard } from "src/guards/company.guard";
import { EmployeeService } from "./employee.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";


const storage = diskStorage({
  destination: process.env.EMPLOYEE_FILE_PATH || 'uploads/emp',
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const name = `${uuidv4()}${ext}`;
    req.body[file.fieldname] =
      `${process.env.EMPLOYEE_FILE_PATH || 'uploads/emp'}/${name}`;
    cb(null, name);
  },
});


@Catch(BadRequestException)
class CleanupFileOnErrorFilter
  implements ExceptionFilter
{
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (request.body.Aadhaar) unlinkSync(request.body.Aadhaar);
    if (request.body.PAN) unlinkSync(request.body.PAN);
    if (request.body.Voter) unlinkSync(request.body.Voter);
    if (request.body.Pic) unlinkSync(request.body.Pic);
    if (request.body.Marksheet) unlinkSync(request.body.Marksheet);

    response
      .status(status)
      .json(exception.getResponse());
  }
}


@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {}

     @Post('add-employee')
      @HttpCode(201)
      @UseFilters(CleanupFileOnErrorFilter)
      @UseInterceptors(
        FileFieldsInterceptor(
          [
            { name: 'Aadhaar', maxCount: 1 },
            { name: 'Pan', maxCount: 1 },
            { name: 'Voter', maxCount: 1 },
            { name: 'Marksheet', maxCount: 1 },
            { name: 'Pic', maxCount: 1 },
          ],
          { storage },
        ),
      )
      @UseGuards(CompanyGuard)
      async addEmployee(
        @Body(new ValidationPipe({ transform: true, whitelist: true })) createEmployeeDto: CreateEmployeeDto,
        @Req() request: Request,
      ): Promise<{ message: string }> {
        
        const authData = (request as any).authData;
        if (authData) {
          createEmployeeDto.CompanyCode = authData.CompanyCode;
          createEmployeeDto.authUserId = authData.authUserId;
        }
        
        this.employeeService.addEmployee(createEmployeeDto);
    
        return { message: 'Employee created successfully' };
      }
    
      @Get('get-employee-details/:id')
      @UseGuards(CompanyGuard)
      async getEmployeeDetails(@Param('id') id: string): Promise<Object> {
        const employeeDetails = await this.employeeService.getEmployeeDetails(parseInt(id));
        return employeeDetails;
      }

      @Post('mark-attendance/:id')
      @UseGuards(CompanyAdminGuard)
      async markAttendance(@Param('id') id: string, @Req() request: Request): Promise<{ message: string }> {
        const employeeId = parseInt(id);
        const present = request.body.present;
        if (typeof present !== 'boolean') {
          throw new BadRequestException('Present must be a boolean value');
        }
        await this.employeeService.markAttendance(employeeId, present);
        return { message: 'Attendance marked successfully' };
      }

      @Get('get-attendance/:id')
      @UseGuards(CompanyGuard)
      async getAttendance(@Param('id') id: string): Promise<Object> {
        const employeeId = parseInt(id);
        if (isNaN(employeeId)) {
          throw new BadRequestException('Invalid employee ID');
        }
        const attendance = await this.employeeService.getAttendance(employeeId);
        return attendance;
      }
}