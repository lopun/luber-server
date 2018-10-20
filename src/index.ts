import dotenv from "dotenv";
// 모든 설정 전에 호출해야한다.
dotenv.config();

import app from "./app";
import { createConnection } from "typeorm";
import { Options } from "graphql-yoga";
import defaultConnectOptions from "./ormConfig";
import decodeJWT from "utils/decodeJWT";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
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
  }
};

// app starting console!
const handleAppStart = () => console.log(`Listening on port ${PORT}`);

// db 연결
createConnection(defaultConnectOptions)
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch(err => console.log(err));
