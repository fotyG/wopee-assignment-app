import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";

import { db } from "@/lib/db";
import Row from "@/components/row";
import { auth } from "@clerk/nextjs";

const UsersPage = async () => {
  const user = auth();
  const profile = await db.profile.findFirst({
    where: {
      userId: user.userId || "",
    },
  });

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
