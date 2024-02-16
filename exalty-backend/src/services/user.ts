import { PrismaClient, user } from "@prisma/client";
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

  public async getByEmail(email: string): Promise<user | null> {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  public async getById(id: number): Promise<user | null> {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  }
}
