import { Request, Response, NextFunction } from "express";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export function prismaErrorHandler() {
  return {
    name: "prisma-error-handler",
    errorHandler: (
      error: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (error instanceof PrismaClientKnownRequestError) {
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
      } else if (error instanceof PrismaClientUnknownRequestError) {
        res.status(500).json({
          message: error.message,
        });
      } else if (error instanceof PrismaClientValidationError) {
        res.status(500).json({
          message: error.message,
        });
      } else if (error instanceof PrismaClientInitializationError) {
        res.status(500).json({
          message: error.message,
        });
      } else if (error instanceof PrismaClientRustPanicError) {
        res.status(500).json({
          message: error.message,
        });
      } else {
        next(error);
      }
    },
  };
}
