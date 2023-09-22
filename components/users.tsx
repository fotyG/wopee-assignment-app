import UserCard from "./user-card";
import { fetchUsers } from "@/actions/fetchUsers";

const Users = async () => {
  const profiles = await fetchUsers();
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {profiles?.map((profile) => (
        <UserCard
          key={profile.id}
          profile={profile}
        />
      ))}
    </div>
  );
};
export default Users;
