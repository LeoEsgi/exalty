import express from "express";
import userRouter from "./user";
import authRouter from "./authentication";



export function buildRoutes(app: express.Express) {
    app.use("/user", userRouter);
    app.use("/auth", authRouter);
}

export function routePlugin() {
    return {
        name: "route-plugin",
        configureRoute(app: express.Express) {
            const route = buildRoutes(app);
        },
    };
}
