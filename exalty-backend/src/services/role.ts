import { PrismaClient, user_role } from "@prisma/client";
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

  public async getByName(role_name: string): Promise<user_role | null> {
    return await prisma.user_role.findFirst({
      where: {
        role_name,
      },
    });
  }

  public async getById(role_id: number): Promise<user_role | null> {
    return await prisma.user_role.findFirst({
      where: {
        role_id,
      },
    });
  }
}
