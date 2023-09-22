import Link from "next/link";
import Image from "next/image";

import { UserButton, currentUser } from "@clerk/nextjs";
import { ModeToggle } from "./theme-toggle";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className="w-full h-20 flex px-5 py-2 items-center justify-between border-b border-slate-500 dark:border-slate-900">
      <Link
        href="/"
        className="aspect-square overflow-hidden"
      >
        <Image
          width={50}
          height={50}
          alt="logo"
          src="/monkey.png"
          className="object-cover rounded-xl"
        />
      </Link>

      <div className="font-semibold text-xl text-slate-600 dark:text-white/90">
        Welcome, <span>{user?.firstName}</span> 🚀
      </div>
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};
export default Navbar;
