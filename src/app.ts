import cors from "cors";
import { ApolloServer, PubSub } from "apollo-server-express";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "utils/decodeJWT";
import { NextFunction, Response } from "express";

const PLAYGROUND_ENDPOINT: string = "/playground";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";

class App {
  public server;
  public app;
  public pubSub: any;
  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    this.server = new ApolloServer({
      typeDefs: schema.typeDefs,
      resolvers: schema.resolvers,
      introspection: true,
      playground: true,
      subscriptions: {
        path: SUBSCRIPTION_ENDPOINT,
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
      },
      context: req => {
        const { connection: { context = null } = {} } = req;
        return {
          req: req.request,
          pubSub: this.pubSub,
          context: context
        };
      }
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app = express();
    this.app.use(cors());
    this.app.use(logger("dev"));
    this.app.use(helmet());
    this.app.use(this.jwt);
    this.server.applyMiddleware({ app: this.app, path: PLAYGROUND_ENDPOINT });
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

export default new App().app;
