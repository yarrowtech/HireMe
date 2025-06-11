import { PartnerRequestDto } from "./partnerRequest.dto";
import { BadRequestException } from "@nestjs/common";


export default function validatePartnerRequest(requestData: any): requestData is PartnerRequestDto {

    // Required text fields (adjust as per your DTO)
    const requiredFields = ["CompanyName", "Contact", "Email", "Address", "CIN", "PAN_No"];
    requiredFields.forEach(field => {
        
        if (field === "Email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(requestData[field])) {
            throw new BadRequestException(`Invalid email format: ${requestData[field]}`);
        }
        else if (field === "Contact" && !/^\d{10}$/.test(requestData[field])) {
            throw new BadRequestException(`Invalid contact number: ${requestData[field]}`);
        }
        else if (!requestData[field] || typeof requestData[field] !== "string" || requestData[field].trim() === "") {
            throw new BadRequestException(`Missing required field: ${field}`);
        }
    });

    // Required file fields (now in requestData as file paths)
    const requiredFiles = ["ESI", "PF", "PAN", "MOA", "GST", "TradeLicense", "MSMC"];
    requiredFiles.forEach(field => {
        if (!requestData[field] || typeof requestData[field] !== "string" || requestData[field].trim() === "") {
            throw new BadRequestException(`Missing required field: ${field}`);
        }
    });

    return true;
}