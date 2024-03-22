import { PrismaClient, event } from "@prisma/client";
const prisma = new PrismaClient();

export default class EventService {
  private static instance: EventService;

  constructor() {}

  public static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  public async getAll(): Promise<event[]> {
    return await prisma.event.findMany();
  }

  public async create(data: event): Promise<event> {
    return await prisma.event.upsert({
      where: {
        id: data.id,
      },
      update: {
        title: data.title,
        description: data.description,
        img: data.img,
        link: data.link,
        start_date: data.start_date,
        end_date: data.end_date,
      },
      create: {
        title: data.title,
        description: data.description,
        img: data.img,
        link: data.link,
        start_date: data.start_date,
        end_date: data.end_date,
      },
    });
  }
}
