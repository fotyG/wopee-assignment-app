import Row from "@/components/row";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import checkProfile from "@/lib/checkProfile";
import { db } from "@/lib/db";

const UsersPage = async () => {
  const profile = await checkProfile();

  const users = await db.profile.findMany();

  if (profile?.role !== "ADMIN") {
    return (
      <div className="flex h-full justify-center items-center container">
        <h1 className="font-bold text-slate-800">
          Sorry, you are not authorized to view this page.
        </h1>
      </div>
    );
  }

  return (
    <div className="container mt-10">
      <Table>
        <TableCaption>List of registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Settings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <Row user={user} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default UsersPage;
