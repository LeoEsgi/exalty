import { PrismaClient, user } from "@prisma/client";
import bcrypt from "bcryptjs";
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
    return await prisma.user.findMany({
      include: {
        role: true,
      },
    });
  }

  public async getByEmail(email: string): Promise<user | null> {
    return await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        address: true,
      },
    });
  }

  public async getById(id: number): Promise<user | null> {
    return await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        address: true,
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
      include: {
        address: true,
      },
    });
  }

  public async updatePassword(id: number, data: user): Promise<user> {
    const password = data.password;
    const hash = await bcrypt.hash(password, 10);
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hash,
      },
    });
  }

  public async updatePoints(
    id: number,
    fidelity_points: number
  ): Promise<user> {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        fidelity_points,
      },
      include: {
        address: true,
      },
    });
  }
}
