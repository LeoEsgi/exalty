import { PrismaClient, user } from "@prisma/client";
import bcrypt from "bcryptjs";
import express from "express";
import { prismaErrorHandler } from "../errors/prisma";
import { checkRole, verifyJwt } from "../middlewares";
import JwtService from "../services/jwt";
import UserService from "../services/user";
import MailService from "../services/mail";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserService.getInstance().getByEmail(email);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const samePassword = await bcrypt.compare(password, user.password);

  if (!samePassword) {
    res.status(401).json({ message: "Wrong password" });
  } else {
    const token = await JwtService.getInstance().createToken(user);
    res.cookie("token", token, { httpOnly: true }).json({ token });
  }
});

router.post("/register", async (req, res, next) => {
  const { pseudo, password, email, first_name, last_name, tag, type_id } =
    req.body;
  const type_id_to_use = type_id ?? 1;
  const user = await UserService.getInstance().getByEmail(email);
  if (user) {
    res.status(409).json({ message: "User already exists" });
    return;
  }
  try {
    const userCreated = await prisma.user
      .create({
        data: {
          pseudo: pseudo,
          password: await bcrypt.hash(password, 10),
          email: email,
          first_name: first_name,
          last_name: last_name,
          discord_tag: tag,
          role_id: type_id_to_use,
        },
      })
      .catch((e) => {
        prismaErrorHandler().errorHandler(e, req, res, (e) => {
          console.log(e);
        });
      });
    if (!userCreated) throw new Error("Error while creating the user");
    const verificationToken = await bcrypt.hash(userCreated.id.toString(), 8);

    const verificationUpdated = await prisma.user
      .update({
        where: {
          id: userCreated.id,
        },
        data: {
          token_verification: verificationToken,
        },
      })
      .catch((e) => {
        prismaErrorHandler().errorHandler(e, req, res, (e) => {
          console.log(e);
        });
      });
    if (!verificationUpdated)
      throw new Error("Error while updating the user token verification");

    MailService.getInstance()
      .sendMail(
        email,
        "Bienvenue sur Exalty",
        "Bienvenue sur Exalty",
        "<h1>Bienvenue sur Exalty</h1> <p>Vous venez de vous inscrire sur Exalty, nous vous souhaitons la bienvenue !</p>" +
          "<p>Veuillez valider votre adresse mail en cliquant sur le lien suivant : <a href='http://localhost:3000/validate-email?token=" +
          verificationToken +
          "'>Valider mon adresse mail</a></p>" +
          "<p>À bientôt sur Exalty !</p> <p>L'équipe Exalty</p>"
      )
      .then(() => {
        return res.json({ message: "User created" });
      });
  } catch (e) {
    next(e);
  }
});

router.post("/validate", async (req, res) => {
  const { token } = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        token_verification: token,
      },
      data: {
        active: true,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User validated" });
  } catch (e: any) {
    prismaErrorHandler().errorHandler(e, req, res, (e) => {
      console.log(e);
    });
  }
});

router.get("/me", verifyJwt, async (req, res) => {
  const user: user = (req as any).user;
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

router.get("/admin", checkRole([2] as user["role_id"][]), (req, res) => {
  res.json({ message: "Authorized" });
});

router.get("/verify", verifyJwt, (req, res) => {
  res.json({ isAuthenticated: true });
});

export default router;
