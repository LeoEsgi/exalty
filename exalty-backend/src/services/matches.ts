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

  public async update(
    id: number,
    title: string,
    instance: string,
    opponent: string,
    opponent_logo: string,
    score_exa: number,
    score_opponent: number,
    format: string,
    date: Date,
    timezone: string,
    link: string,
    status: match_status,
    deleted?: boolean
  ): Promise<matches> {
    if (deleted) {
      return await prisma.matches.delete({
        where: {
          id,
        },
      });
    }
    return await prisma.matches.upsert({
      where: {
        id,
      },
      update: {
        title,
        instance,
        opponent,
        opponent_logo,
        score_exa,
        score_opponent,
        format,
        date,
        timezone,
        link,
        status,
      },
      create: {
        title,
        instance,
        opponent,
        opponent_logo,
        score_exa,
        score_opponent,
        format,
        date,
        timezone,
        link,
        status,
      },
    });
  }
}
