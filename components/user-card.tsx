"use client";

import Link from "next/link";
import Image from "next/image";
import { Profile } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowBigRight, Github, Linkedin } from "lucide-react";

type UserCardProps = {
  profile: Profile;
};

const UserCard = ({ profile }: UserCardProps) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex bg-white dark:bg-slate-600  group max-w-md shadow-md hover:shadow-xl transition-all rounded-xl p-6 space-x-4">
      <Image
        width={200}
        height={200}
        alt="profile pic"
        src={profile.profileImage || ""}
        className="object-cover aspect-square rounded-md"
      />
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-xl font-semibold dark:text-white/90">
            {profile.firstName} {profile.lastName}
          </p>
          <Link
            className="hover:underline"
            href={`mailto:${profile.email}`}
          >
            <p className="text-slate-600 text-xs dark:text-white/60">
              {profile.email}
            </p>
          </Link>
          <p className="text-slate-700 dark:text-white/90 text-sm mt-2 line-clamp-4">
            {profile.description}
          </p>
        </div>

        <div className="flex justify-between opacity-0 group-hover:opacity-100 transition-all">
          <div className="flex gap-2 items-center">
            <Github className="hover:text-slate-400 text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:cursor-pointer" />
            <Linkedin className="hover:text-slate-400 text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:cursor-pointer" />
          </div>
          <div className="flex items-center">
            <ArrowBigRight
              onClick={() => {
                router.push(`/profile/${profile.id}`);
              }}
              className="w-8 h-8 text-slate-800 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-200 hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
