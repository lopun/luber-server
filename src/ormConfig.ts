import { ConnectionOptions } from "typeorm";

console.log(process.env.DB_PASSWORD);
const defaultConnectOptions: ConnectionOptions = {
  type: "postgres",
  database: "luber",
  synchronize: true,
  logging: true,
  entities: ["entities/*.*"],
  host: process.env.DB_ENDPOINT || "localhost",
  port: 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || ""
};

export default defaultConnectOptions;
