import { DataSource, DataSourceOptions } from "typeorm";
import * as ormconfig from "../ormconfig";
import { UserEntity } from "./users/user.entity";

let dataSource: DataSource;

export async function getDataSource() {
  try {
    if (dataSource) {
      console.log("reusing connection...");
      return dataSource;
    }
    const AppDataSource = new DataSource({ ...ormconfig, entities: [UserEntity] } as DataSourceOptions);
    console.log("connecting to db...");
    dataSource = await AppDataSource.initialize();
    console.log("connected to db");
    return dataSource;
  } catch (error) {
    console.log("error connecting to db", error);
  }
}
