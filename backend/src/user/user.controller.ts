import { Catch, Controller, Get, Headers, UseFilters, ExceptionFilter, ArgumentsHost, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JsonWebTokenError } from "jsonwebtoken";
import { UserGuard } from "src/guards/user.guard";


@Catch(JsonWebTokenError)
class JsonWebTokenErrorFilter implements ExceptionFilter {
      catch(exception: JsonWebTokenError, host: ArgumentsHost) {
        console.log(exception)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = 401;

        response.status(status).json({
            message: "Invalid token",
            error: "Unauthorized"
        });
    }
}


@Controller("user")
@UseFilters(JsonWebTokenErrorFilter)
export class UserController {

    constructor(private userService: UserService) {}
    
    @Get("details")
    @UseGuards(UserGuard)
    async getUserDetails(@Headers("authorization") token: string): Promise<Object> {
        const userDetails = await this.userService.getUserDetails(token);
        return {
            message: "User details retrieved successfully",
            data: userDetails
        }
    }
}