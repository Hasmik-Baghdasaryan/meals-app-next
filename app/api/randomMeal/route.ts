import { NextResponse } from "next/server";
import { getRandomMeal } from "@/app/_lib/meals";

export async function GET() {
  try {
    const meal = await getRandomMeal();
    return NextResponse.json(meal, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch meal" },
      { status: 404 },
    );
  }
}
