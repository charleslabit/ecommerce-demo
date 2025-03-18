import { mockProducts } from "@/mocks";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
let products = [...mockProducts]; // Mock database

interface RouteParams {
  id: string;
}

// GET /api/products/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  const { id } = await params;
  const product = mockProducts?.find((product) => product.id === id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// UPDATE a product
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  const { id } = await params;
  const body = await req.json();
  products = products.map((p) => (p.id === id ? { ...p, ...body } : p));
  return NextResponse.json({ message: "Product updated" });
}

// DELETE a product
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  const { id } = await params;
  products = products.filter((p) => p.id !== id);
  return NextResponse.json({ message: "Product deleted" });
}
