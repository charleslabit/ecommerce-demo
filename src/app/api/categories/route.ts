import { mockCategories } from "@/mocks";
import { Category } from "@/types";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

let categories = [...mockCategories]; // Mock database

export async function GET() {
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const body: Omit<Category, "id"> = await req.json();
  const newCategory: Category = { id: Date.now().toString(), ...body };
  categories.push(newCategory);
  return NextResponse.json(newCategory, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, name, imageUrl } = await req.json();
  categories = categories.map((cat) =>
    cat.id === id ? { ...cat, name, imageUrl } : cat
  );
  return NextResponse.json({ message: "Category updated" });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  categories = categories.filter((cat) => cat.id !== id);
  return NextResponse.json({ message: "Category deleted" });
}
