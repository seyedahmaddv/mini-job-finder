import { NextResponse } from "next/server";
import { BASE, safeFetch } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("query") || "developer";
  const res = await safeFetch(`${BASE}?search=${encodeURIComponent(q)}`);
  if (!res.ok) return NextResponse.json({ jobs: [] }, { status: 500 });
  return NextResponse.json(res.data);
}