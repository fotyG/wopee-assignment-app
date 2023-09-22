import { DialogOnboarding } from "@/components/dialog-onboarding";
import Users from "@/components/users";
import checkProfile from "@/lib/checkProfile";

export default async function Home() {
  const profile = await checkProfile();

  if (!profile) {
    return <DialogOnboarding />;
  }

  return (
    <main className="h-full p-10">
      <div className="flex justify-center ">
        <h1 className="p-4 bg-slate-100 max-w-fit rounded-xl dark:bg-slate-600">
          Check out these amazing candidates to make Wopee great again!
        </h1>
      </div>

      <div className="flex mt-5">
        <Users />
      </div>
    </main>
  );
}
