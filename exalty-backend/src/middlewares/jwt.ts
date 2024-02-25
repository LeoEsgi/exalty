import { Request, Response, NextFunction } from "express";
import JwtService from "../services/jwt";
import UserService from "../services/user";
import RoleService from "../services/role";

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Missing JWT Token" });
    return;
  }
  try {
    const userInToken = JwtService.getInstance().verifyToken(token);
    const user = await UserService.getInstance().getByEmail(userInToken.email);
    (req as any).user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export const checkRole = (allowedRoles: number[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Missing JWT Token" });
      return;
    }

    try {
      const userInToken = JwtService.getInstance().verifyToken(token);
      const user = await UserService.getInstance().getByEmail(
        userInToken.email
      );

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      // Récupère les rôles de l'utilisateur
      const userRoles = await UserService.getInstance().getById(user.id);
      if (!userRoles) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      // Vérifie si l'utilisateur a un rôle autorisé
      const hasAllowedRole = allowedRoles.some((role) => {
        return userRoles.role_id === role;
      });
      if (hasAllowedRole) {
        next();
        return;
      }

      throw new Error("Wrong role");
    } catch (e) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
