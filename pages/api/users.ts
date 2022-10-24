// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { UsersService } from "server/users/users.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const users = await UsersService.getUsers();
  res.status(200).json(users);
}
