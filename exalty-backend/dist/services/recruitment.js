"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class RecruitmentService {
    constructor() { }
    static getInstance() {
        if (!RecruitmentService.instance) {
            RecruitmentService.instance = new RecruitmentService();
        }
        return RecruitmentService.instance;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitment.findMany();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitment.findFirst({
                where: {
                    id,
                },
            });
        });
    }
    getByCategoryId(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitment.findMany({
                where: {
                    category_id,
                },
            });
        });
    }
    getBySubCategoryId(sub_category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitment.findMany({
                where: {
                    recruitement_sub_categoryId: sub_category_id,
                },
            });
        });
    }
    create(title, description, category_id, sub_category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitment.create({
                data: {
                    title,
                    description,
                    category_id,
                    recruitement_sub_categoryId: sub_category_id,
                },
            });
        });
    }
    update(id, title, description, category_id, sub_category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitment.update({
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
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitment.delete({
                where: {
                    id,
                },
            });
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitement_category.findMany();
        });
    }
    getSubCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitement_sub_category.findMany();
        });
    }
    getSubCategoriesByCategoryId(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitement_sub_category.findMany({
                where: {
                    recruitement_categoryId: category_id,
                },
            });
        });
    }
    createCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitement_category.create({
                data: {
                    name,
                },
            });
        });
    }
    createSubCategory(name, category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitement_sub_category.create({
                data: {
                    name,
                    recruitement_categoryId: category_id,
                },
            });
        });
    }
    updateCategory(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitement_category.update({
                where: {
                    id,
                },
                data: {
                    name,
                },
            });
        });
    }
    updateSubCategory(id, name, category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitement_sub_category.update({
                where: {
                    id,
                },
                data: {
                    name,
                    recruitement_categoryId: category_id,
                },
            });
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitement_category.delete({
                where: {
                    id,
                },
            });
        });
    }
    deleteSubCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.recruitement_sub_category.delete({
                where: {
                    id,
                },
            });
        });
    }
}
exports.default = RecruitmentService;
