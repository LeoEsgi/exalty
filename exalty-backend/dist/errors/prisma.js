"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaErrorHandler = void 0;
const library_1 = require("@prisma/client/runtime/library");
function prismaErrorHandler() {
    return {
        name: "prisma-error-handler",
        errorHandler: (error, req, res, next) => {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case "P2002":
                        res.status(409).json({
                            message: error.message,
                        });
                        break;
                    case "P2003":
                        res.status(404).json({
                            message: error.message,
                        });
                        break;
                    default:
                        res.status(500).json({
                            message: error.message,
                        });
                        break;
                }
            }
            else if (error instanceof library_1.PrismaClientUnknownRequestError) {
                res.status(500).json({
                    message: error.message,
                });
            }
            else if (error instanceof library_1.PrismaClientValidationError) {
                res.status(500).json({
                    message: error.message,
                });
            }
            else if (error instanceof library_1.PrismaClientInitializationError) {
                res.status(500).json({
                    message: error.message,
                });
            }
            else if (error instanceof library_1.PrismaClientRustPanicError) {
                res.status(500).json({
                    message: error.message,
                });
            }
            else {
                next(error);
            }
        },
    };
}
exports.prismaErrorHandler = prismaErrorHandler;
