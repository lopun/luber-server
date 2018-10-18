import { ConnectionOptions } from "typeorm";

const defaultConnectOptions: ConnectionOptions = {
  type: "postgres",
  database: "luber",
  synchronize: true,
  // 모든 로깅을 보게된다.
  logging: true,
  entities: ["entities/*.*"],
  host: process.env.DB_ENDPOINT || "localhost",
  port: 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || ""
};

export default defaultConnectOptions;
