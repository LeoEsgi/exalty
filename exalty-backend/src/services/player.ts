import { PrismaClient, game, player } from "@prisma/client";
const prisma = new PrismaClient();

export default class PlayerService {
  private static instance: PlayerService;

  constructor() {}

  public static getInstance(): PlayerService {
    if (!PlayerService.instance) {
      PlayerService.instance = new PlayerService();
    }
    return PlayerService.instance;
  }

  public async getAll(): Promise<player[] | null> {
    return await prisma.player.findMany();
  }

  public async getById(id: number): Promise<player | null> {
    return await prisma.player.findFirst({
      where: {
        id,
      },
    });
  }

  public async getByGameId(game_id: number): Promise<player[] | null> {
    return await prisma.player.findMany({
      where: {
        game_id,
      },
    });
  }

  public async addPlayer(
    name: string,
    role: string,
    img: string,
    game_id: number
  ): Promise<player> {
    return await prisma.player.create({
      data: {
        name,
        role,
        img,
        game_id,
      },
    });
  }

  public async updatePlayer(
    id: number,
    name: string,
    role: string,
    img: string,
    game_id: number,
    deleted: boolean
  ): Promise<player> {
    if (deleted) {
      return await prisma.player.delete({
        where: {
          id,
        },
      });
    }
    return await prisma.player.upsert({
      where: {
        id,
      },
      update: {
        name,
        role,
        img,
        game_id,
      },
      create: {
        name,
        role,
        img,
        game_id,
      },
    });
  }
}
