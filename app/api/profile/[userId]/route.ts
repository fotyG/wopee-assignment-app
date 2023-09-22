import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = auth();
    const values = await req.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.profile.update({
      where: { id: params.userId },
      data: {
        ...values,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("[PROFILE_USERID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = auth();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile = await db.profile.findUnique({
      where: { id: params.userId },
    });

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.log("[PROFILE_USERID_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
