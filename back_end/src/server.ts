import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import mongoose from "mongoose";
import { CarResolver } from "./resolvers/CarResolver";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { UserService } from "./services/users.service";
import { createAcesstoken, createRefreshToken } from "./utils/auth";

(async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.post("/refresh-token", async (req, res) => {
    const token = req.cookies.rt;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      return res.send({ ok: false, accessToken: "" });
    }
    const user = await UserService.getUser(payload.id);
    if (user == null) {
      return res.send({ ok: false, accessToken: "" });
    }
    res.cookie("rt", createRefreshToken(user.id!), {
      httpOnly: true,
      path: "refresh-token",
    });

    return res.send({
      ok: true,
      accessToken: createAcesstoken(user.id!),
    });
  });

  await mongoose
    .connect("mongodb://127.0.0.1:27017/finn_price_reduction", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Connected to mongo"))
    .catch(() => console.log("Funka dårlig"));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, CarResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}/graphql`);
  });
})();
