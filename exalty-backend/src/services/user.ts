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

  public async getAll(): Promise<user[]> {
    return await prisma.user.findMany();
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

  public async getByRoleId(role_id: number): Promise<user[]> {
    return await prisma.user.findMany({
      where: {
        role_id,
      },
    });
  }

  public async update(id: number, data: user, deleted: boolean): Promise<user> {
    if (deleted) {
      return await prisma.user.delete({
        where: {
          id,
        },
      });
    }
    return await prisma.user.upsert({
      where: {
        id,
      },
      update: data,
      create: data,
    });
  }
}
