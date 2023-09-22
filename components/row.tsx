"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Profile } from "@prisma/client";

import { TableCell, TableRow } from "./ui/table";
import { DialogRoleChange } from "./dialog-role-change";

const Row = ({ user }: { user: Profile }) => {
  const [onOpen, setOnOpen] = useState(false);

  return (
    <TableRow key={user.id}>
      <TableCell className="font-medium">
        {user.firstName} {user.lastName}
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell
        onClick={() => setOnOpen(true)}
        className="flex gap-2 items-center text-slate-500 group hover:text-slate-800 hover:bg-slate-200 rounded-md cursor-pointer justify-center"
      >
        Edit
        <Pencil className="w-4 h-4 text-slate-500 group-hover:text-slate-800" />
      </TableCell>
      <DialogRoleChange
        user={user}
        isOpen={onOpen}
        onClose={() => setOnOpen((prev) => !prev)}
      />
    </TableRow>
  );
};
export default Row;
