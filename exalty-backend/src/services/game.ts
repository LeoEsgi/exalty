import { PrismaClient, game, player } from "@prisma/client";
const prisma = new PrismaClient();

export default class GameService {
  private static instance: GameService;

  constructor() {}

  public static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }

  public async getAll(): Promise<game[] | null> {
    return await prisma.game.findMany();
  }

  public async getById(id: number): Promise<game | null> {
    return await prisma.game.findFirst({
      where: {
        id,
      },
    });
  }

  public async getPlayers(id: number): Promise<player[] | null> {
    return await prisma.player.findMany({
      where: {
        game_id: id,
      },
    });
  }

  public async getAllPlayers(): Promise<player[] | null> {
    return await prisma.player.findMany();
  }

  public async create(
    title: string,
    name: string,
    desc: string,
    img: string
  ): Promise<game> {
    return await prisma.game.create({
      data: {
        title,
        name,
        desc,
        img,
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

  public async update(
    id: number,
    title: string,
    name: string,
    desc: string,
    img: string
  ): Promise<game> {
    return await prisma.game.upsert({
      where: {
        id,
      },
      update: {
        title,
        name,
        desc,
        img,
      },
      create: {
        title,
        name,
        desc,
        img,
      },
    });
  }
}
