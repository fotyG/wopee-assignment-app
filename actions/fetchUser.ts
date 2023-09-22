import { db } from "@/lib/db";

export const fetchUser = async (profileId: string) => {
  const profile = await db.profile.findUnique({
    where: {
      id: profileId,
    },
  });

  return profile;
};
