import { PrismaClient, role } from "@prisma/client";
const prisma = new PrismaClient();

export default class RoleService {
  private static instance: RoleService;

  constructor() {}

  public static getInstance(): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService();
    }
    return RoleService.instance;
  }

  public async getByName(name: string): Promise<role | null> {
    return await prisma.role.findFirst({
      where: {
        name,
      },
    });
  }

  public async getById(id: number): Promise<role | null> {
    return await prisma.role.findFirst({
      where: {
        id,
      },
    });
  }
}
