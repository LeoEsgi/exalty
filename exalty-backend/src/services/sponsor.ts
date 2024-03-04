import { PrismaClient, sponsor } from "@prisma/client";
const prisma = new PrismaClient();

export default class SponsorService {
  private static instance: SponsorService;

  constructor() {}

  public static getInstance(): SponsorService {
    if (!SponsorService.instance) {
      SponsorService.instance = new SponsorService();
    }
    return SponsorService.instance;
  }

  public async getAll(): Promise<sponsor[] | null> {
    return await prisma.sponsor.findMany();
  }

  public async getById(id: number): Promise<sponsor | null> {
    return await prisma.sponsor.findFirst({
      where: {
        id,
      },
    });
  }

  public async create(
    name: string,
    img: string,
    description: string,
    link: string
  ): Promise<sponsor> {
    return await prisma.sponsor.create({
      data: {
        name,
        img,
        description,
        link,
      },
    });
  }

  public async update(
    id: number,
    name: string,
    img: string,
    description: string,
    link: string,
    deleted: boolean
  ): Promise<sponsor> {
    if (deleted) {
      return await prisma.sponsor.delete({
        where: {
          id,
        },
      });
    }

    return await prisma.sponsor.upsert({
      where: {
        id,
      },

      update: {
        name,
        img,
        description,
        link,
      },
      create: {
        name,
        img,
        description,
        link,
      },
    });
  }

  public async delete(id: number): Promise<sponsor> {
    return await prisma.sponsor.delete({
      where: {
        id,
      },
    });
  }
}
