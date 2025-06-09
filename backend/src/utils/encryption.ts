import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-cbc";


export function encryptUserData(userId: string, type: string): string {
    const key = Buffer.from(process.env.ENCRYPTION_KEY!, "hex");
    const iv = randomBytes(16);
    const cipher = createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(`${userId}:${type}`, "utf8", "hex");
    encrypted += cipher.final("hex");
    
    return `${iv.toString("hex")}:${encrypted}`;
}

export function decryptUserData(encryptedData: string): { userId: string; type: string } {
    const key = Buffer.from(process.env.ENCRYPTION_KEY!, "hex");
    const parts = encryptedData.split(":");
    const iv = Buffer.from(parts[0], "hex");
    
    const decipher = createDecipheriv(ALGORITHM, key, iv);
    
    let decrypted = decipher.update(parts[1], "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    const [userId, type] = decrypted.split(":");
    
    return { userId, type };
}