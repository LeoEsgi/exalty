import {
  PrismaClient,
  recruitement_category,
  recruitement_sub_category,
  recruitment,
} from "@prisma/client";
const prisma = new PrismaClient();

export default class RecruitmentService {
  private static instance: RecruitmentService;

  constructor() {}

  public static getInstance(): RecruitmentService {
    if (!RecruitmentService.instance) {
      RecruitmentService.instance = new RecruitmentService();
    }
    return RecruitmentService.instance;
  }

  public async getAll(): Promise<recruitment[] | null> {
    return await prisma.recruitment.findMany();
  }

  public async getById(id: number): Promise<recruitment | null> {
    return await prisma.recruitment.findFirst({
      where: {
        id,
      },
    });
  }

  public async getByCategoryId(
    category_id: number
  ): Promise<recruitment[] | null> {
    return await prisma.recruitment.findMany({
      where: {
        category_id,
      },
    });
  }

  public async getBySubCategoryId(
    sub_category_id: number
  ): Promise<recruitment[] | null> {
    return await prisma.recruitment.findMany({
      where: {
        recruitement_sub_categoryId: sub_category_id,
      },
    });
  }

  public async create(
    title: string,
    description: string,
    category_id: number,
    sub_category_id: number
  ): Promise<recruitment> {
    return await prisma.recruitment.create({
      data: {
        title,
        description,
        category_id,
        recruitement_sub_categoryId: sub_category_id,
      },
    });
  }

  public async update(
    id: number,
    title: string,
    description: string,
    category_id: number,
    sub_category_id: number
  ): Promise<recruitment> {
    return await prisma.recruitment.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        category_id,
        recruitement_sub_categoryId: sub_category_id,
      },
    });
  }

  public async delete(id: number): Promise<recruitment> {
    return await prisma.recruitment.delete({
      where: {
        id,
      },
    });
  }

  public async getCategories(): Promise<recruitement_category[] | null> {
    return await prisma.recruitement_category.findMany();
  }

  public async getSubCategories(): Promise<recruitement_sub_category[] | null> {
    return await prisma.recruitement_sub_category.findMany();
  }

  public async getSubCategoriesByCategoryId(
    category_id: number
  ): Promise<recruitement_sub_category[] | null> {
    return await prisma.recruitement_sub_category.findMany({
      where: {
        recruitement_categoryId: category_id,
      },
    });
  }

  public async createCategory(name: string): Promise<recruitement_category> {
    return await prisma.recruitement_category.create({
      data: {
        name,
      },
    });
  }

  public async createSubCategory(
    name: string,
    category_id: number
  ): Promise<recruitement_sub_category> {
    return await prisma.recruitement_sub_category.create({
      data: {
        name,
        recruitement_categoryId: category_id,
      },
    });
  }

  public async updateCategory(
    id: number,
    name: string
  ): Promise<recruitement_category> {
    return await prisma.recruitement_category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  public async updateSubCategory(
    id: number,
    name: string,
    category_id: number
  ): Promise<recruitement_sub_category> {
    return await prisma.recruitement_sub_category.update({
      where: {
        id,
      },
      data: {
        name,
        recruitement_categoryId: category_id,
      },
    });
  }

  public async deleteCategory(id: number): Promise<recruitement_category> {
    return await prisma.recruitement_category.delete({
      where: {
        id,
      },
    });
  }

  public async deleteSubCategory(
    id: number
  ): Promise<recruitement_sub_category> {
    return await prisma.recruitement_sub_category.delete({
      where: {
        id,
      },
    });
  }
}
