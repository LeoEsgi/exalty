import { Request, Response, NextFunction } from "express";
import JwtService from "../services/jwt";
import { user, user_role } from "@prisma/client";
import UserService from "../services/user";

// Your custom "middleware" function:
export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Missing JWT Token" });
    return;
  }
  try {
    const tokenWithoutBearer = token.split(" ")[1];
    const userInToken =
      JwtService.getInstance().verifyToken(tokenWithoutBearer);
    const user = await UserService.getInstance().getByEmail(userInToken.email);
    (req as any).user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export const checkRole = (allowedRoles: user["role"][]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "Missing JWT Token" });
      return;
    }

    try {
      const tokenWithoutBearer = token.split(" ")[1];
      const userInToken =
        JwtService.getInstance().verifyToken(tokenWithoutBearer);
      const user = await UserService.getInstance().getByEmail(
        userInToken.email
      );
      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      if (allowedRoles.includes(user.role)) {
        next();
        return;
      }

      throw new Error("Wrong role");
    } catch (e) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
