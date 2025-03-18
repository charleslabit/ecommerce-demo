import { mockProducts } from "@/mocks";
import { Product } from "@/types";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

let products = [...mockProducts]; // Mock database

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body: Omit<Product, "id"> = await req.json();
  const newCategory: Product = { id: Date.now().toString(), ...body };
  products.push(newCategory);
  return NextResponse.json(newCategory, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, name, imageUrl } = await req.json();
  products = products.map((cat) =>
    cat.id === id ? { ...cat, name, imageUrl } : cat
  );
  return NextResponse.json({ message: "Product updated" });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  products = products.filter((cat) => cat.id !== id);
  return NextResponse.json({ message: "Product deleted" });
}
