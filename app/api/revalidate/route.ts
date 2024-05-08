import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidatePath("/posts");
  console.log("hi");
  return NextResponse.json({m:"h"})
}
