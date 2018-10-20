import dotenv from "dotenv";
// 모든 설정 전에 호출해야한다.
dotenv.config();

import app from "./app";
import { createConnection } from "typeorm";
import defaultConnectOptions from "./ormConfig";

const PORT: number | string = process.env.PORT || 4000;

const expressOptions = {
  port: PORT
};

// express start handler
const handleAppStart = () => console.log(`Listening on port ${PORT}`);

// db 연결
createConnection(defaultConnectOptions)
  .then(() => {
    app.listen(expressOptions, handleAppStart);
  })
  .catch(err => console.log(err));
