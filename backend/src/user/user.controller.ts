import { Catch, Controller, Get, Headers, UseFilters, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { UserService } from "./user.service";
import { JsonWebTokenError } from "jsonwebtoken";


@Catch(JsonWebTokenError)
class JsonWebTokenErrorFilter implements ExceptionFilter {
      catch(exception: JsonWebTokenError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = 401; // Unauthorized

        response.status(status).json({
            statusCode: status,
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
    async getUserDetails(@Headers("authToken") authToken: string, @Headers("metadata") metadata: string): Promise<Object> {
        const userDetails = await this.userService.getUserDetails(authToken, metadata);
        return {
            message: "User details retrieved successfully",
            data: userDetails
        }
    }
}