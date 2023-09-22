import Link from "next/link";
import { Cog, User } from "lucide-react";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Separator } from "./ui/separator";

export const Sidebar = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const profile = await db.profile.findFirst({
    where: {
      userId,
    },
  });

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r dark:bg-slate-900 border-r-slate-500 dark:border-r-slate-900 bg-white shadow-sm">
      <h1 className="p-6 font-bold">Settings</h1>
      <Separator
        orientation="horizontal"
        className="bg-slate-700/20 w-[80%] mx-auto"
      />
      <div className="flex w-full flex-col mt-2 pl-6">
        {profile?.role === "ADMIN" && (
          <Link
            href="/users"
            className=" flex gap-2 items-center hover:bg-slate-200 dark:hover:bg-slate-500  max-w-fit px-2 rounded-xl hover:cursor-pointer group h-10"
          >
            <Cog className="text-slate-500 w-4 h-4 dark:group-hover:text-white/90" />
            <span className="text-muted-foreground text-sm group-hover:text-slate-700 dark:group-hover:text-white/90">
              Manage Users
            </span>
          </Link>
        )}
        <Link
          href={`/profile/settings/${profile?.id}`}
          className=" flex gap-2 items-center hover:bg-slate-200 dark:hover:bg-slate-500 max-w-fit px-2 rounded-xl hover:cursor-pointer group h-10"
        >
          <User className="text-slate-500 w-4 h-4 dark:group-hover:text-white/90" />
          <span className="text-muted-foreground text-sm group-hover:text-slate-700 dark:group-hover:text-white/90">
            My Profile
          </span>
        </Link>
      </div>
    </div>
  );
};
