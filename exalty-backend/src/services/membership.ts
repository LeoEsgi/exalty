import { PrismaClient, membership } from "@prisma/client";
const prisma = new PrismaClient();

export default class MemberShipService {
  private static instance: MemberShipService;

  constructor() {}

  public static getInstance(): MemberShipService {
    if (!MemberShipService.instance) {
      MemberShipService.instance = new MemberShipService();
    }
    return MemberShipService.instance;
  }

  public async getAll(): Promise<membership[] | null> {
    return await prisma.membership.findMany();
  }

  public async create(data: membership): Promise<membership | null> {
    return await prisma.membership.create({
      data,
    });
  }
}
