import { db } from "@/lib/db";

export const fetchUsers = async () => {
  const res = await db.profile.findMany();
  return res;
};
