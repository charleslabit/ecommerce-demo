import { mockProducts } from "@/mocks";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
let products = [...mockProducts]; // Mock database

// GET a product by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = mockProducts.find((p) => p.id === params.id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// UPDATE a product
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  products = products.map((p) => (p.id === params.id ? { ...p, ...body } : p));
  return NextResponse.json({ message: "Product updated" });
}

// DELETE a product
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  products = products.filter((p) => p.id !== params.id);
  return NextResponse.json({ message: "Product deleted" });
}
