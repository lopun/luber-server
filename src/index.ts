import dotenv from "dotenv";
// 모든 설정 전에 호출해야한다.
dotenv.config();

import App from "./app";
import { createConnection } from "typeorm";
import defaultConnectOptions from "./ormConfig";

const PORT: number | string = process.env.PORT || 4000;

// app starting console!
const handleServerStart = server => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
};

// db 연결
createConnection(defaultConnectOptions)
  .then(() => {
    App.httpServer.listen({ port: PORT }, () => handleServerStart(App.server));
  })
  .catch(err => console.log(err));
