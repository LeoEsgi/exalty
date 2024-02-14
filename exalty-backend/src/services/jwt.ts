import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export default class JwtService {
    private static instance: JwtService;

    constructor() {}

    public static getInstance(): JwtService {
        if (!JwtService.instance) {
            JwtService.instance = new JwtService();
        }
        return JwtService.instance;
    }

    public createToken(user: User): String {
        if (!process.env.JWT_SECRET)
            throw new Error("JWT_SECRET is not defined");
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: 86400, // expires in 24 hours
        });
        return token;
    }

    public verifyToken(token: string): User {
        if (!process.env.JWT_SECRET)
            throw new Error("JWT_SECRET is not defined");
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return (decoded as any).user;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
