import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import mongoose from "mongoose";

(async () => {
  const app = express();

  await mongoose
    .connect("mongodb://127.0.0.1:27017/Cars", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Connected to mongo"))
    .catch(() => console.log("Funka dårlig"));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}/graphql`);
  });
})();
