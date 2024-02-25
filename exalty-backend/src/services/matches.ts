import { PrismaClient, matches, match_status } from "@prisma/client";
const prisma = new PrismaClient();

export default class MatchesService {
  private static instance: MatchesService;

  constructor() {}

  public static getInstance(): MatchesService {
    if (!MatchesService.instance) {
      MatchesService.instance = new MatchesService();
    }
    return MatchesService.instance;
  }

  public async getAll(): Promise<matches[] | null> {
    return await prisma.matches.findMany();
  }

  public async getById(id: number): Promise<matches | null> {
    return await prisma.matches.findFirst({
      where: {
        id,
      },
    });
  }

  public async getByStatus(status: match_status): Promise<matches[] | null> {
    return await prisma.matches.findMany({
      where: {
        status,
      },
    });
  }
}
