import { getDataSource } from "../db-connect";
import { UserEntity } from "./user.entity";

export const UsersService = {
  async getUsers() {
    await getDataSource();
    return UserEntity.find();
  },
};
