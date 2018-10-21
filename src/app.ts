import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { PubSub } from "apollo-server";
import express from "express";
import http from "http";
import helmet from "helmet";
import logger from "morgan";
import { typeDefs, resolvers } from "./schema";
import decodeJWT from "utils/decodeJWT";
import { NextFunction, Response } from "express";

class App {
  public server: ApolloServer;
  public app;
  public pubSub: any;
  public httpServer;
  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async request => {
        const { connection: { context = null } = {}, req } = request;
        return {
          req: req,
          pubSub: this.pubSub,
          context: context
        };
      },
      subscriptions: {
        onConnect: async connectionParams => {
          const token = connectionParams["JWT"];
          if (token) {
            const user = await decodeJWT(token);
            if (user) {
              return {
                currentUser: user
              };
            }
          }
          throw new Error("No JWT. Can't Subscribe.");
        }
      }
    });
    this.middlewares();
    this.subscription();
  }
  private middlewares = (): void => {
    this.app = express();
    this.app.use(cors());
    this.app.use(logger("dev"));
    this.app.use(helmet());
    this.app.use(this.jwt);
    this.server.applyMiddleware({ app: this.app, path: "/graphql" });
  };

  private subscription = (): void => {
    this.httpServer = http.createServer(this.app);
    this.server.installSubscriptionHandlers(this.httpServer);
  };

  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("JWT");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App();
