import { mockCategories } from "@/mocks";
import { Category, CategoryInput } from "@/types";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const categories = [...mockCategories]; // Mock database

export async function GET() {
  return NextResponse.json(categories, { status: 200 });
}

export async function POST(req: Request) {
  const category: CategoryInput = await req.json();
  const newCategory: Category = { ...category, id: Date.now().toString() };
  return NextResponse.json(newCategory, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, name, imageUrl }: Category = await req.json();
  const updatedCategory = categories.find((cat) => cat.id === id);
  if (!updatedCategory) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  return NextResponse.json(
    { ...updatedCategory, name, imageUrl },
    { status: 200 }
  );
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const deletedCategory = categories.find((cat) => cat.id === id);

  if (!deletedCategory) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  return NextResponse.json(deletedCategory, {
    status: 200,
  });
}
