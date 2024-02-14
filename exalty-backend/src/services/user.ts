import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export default class UserService {
    private static instance: UserService;

    constructor() {}

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public async getByAddress(address: string): Promise<User | null> {
        return await prisma.user.findFirst({
            where: {
                address,
            },
        });
    }

    public async getByEmail(email: string): Promise<User | null> {
        return await prisma.user.findFirst({
            where: {
                email,
            },
        });
    }

    public async setMessageToSign(user: User, message: string) {
        return await prisma.user.update({
            where: {
                user_id: user.user_id,
            },
            data: {
                signed_message: message,
            },
        });
    }

    public async setAddress(user: User, address: string){
        return await prisma.user.update({
            where: {
                user_id: user.user_id,
            },
            data: {
                address,
            },
        });
    }
}
