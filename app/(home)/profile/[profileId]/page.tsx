import Image from "next/image";

import { fetchUser } from "@/actions/fetchUser";

const ProfileIdPage = async ({ params }: { params: { profileId: string } }) => {
  const profile = await fetchUser(params.profileId);
  return (
    <div className="flex flex-col container w-full mt-10">
      <div className="flex w-[100%]">
        <div className="relative w-1/3 aspect-square overflow-hidden rounded-md">
          <Image
            fill
            alt="profile pic"
            src={profile?.profileImage || ""}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-[2/3] pl-10">
          <h1 className="font-bold mt-10 text-xl">
            {profile?.firstName} {profile?.lastName}
          </h1>
          <h2>What sets me apart from others is...</h2>
          <p>{profile?.description}</p>
        </div>
      </div>
    </div>
  );
};
export default ProfileIdPage;
