import { PrismaClient, product } from "@prisma/client";
const prisma = new PrismaClient();

export default class ProductService {
  private static instance: ProductService;

  constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  public async getAll(): Promise<product[] | null> {
    return await prisma.product.findMany();
  }

  public async getById(id: number): Promise<product | null> {
    return await prisma.product.findFirst({
      where: {
        id,
      },
    });
  }

  public async update(
    id: number,
    name: string,
    flockingable: boolean,
    sizable: boolean,
    img: string,
    description: string,
    basePrice: number,
    img2?: string,
    deleted?: boolean
  ): Promise<product> {
    if (deleted) {
      return await prisma.product.delete({
        where: {
          id,
        },
      });
    }
    return await prisma.product.upsert({
      where: {
        id,
      },
      update: {
        name,
        flockingable,
        sizable,
        img,
        description,
        basePrice,
        img2,
      },
      create: {
        name,
        flockingable,
        sizable,
        img,
        description,
        basePrice,
        img2,
      },
    });
  }
}
