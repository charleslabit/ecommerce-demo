import { mockProducts } from "@/mocks";
import { Product } from "@/types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

let products = [...mockProducts]; // Mock database

export async function GET() {
  return NextResponse.json(products, { status: 200 });
}

export async function POST(req: Request) {
  const body: Omit<Product, "id"> = await req.json();
  const newProduct: Product = { id: Date.now().toString(), ...body };
  return NextResponse.json(newProduct, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, ...updateValues } = await req.json();
  const updatedProduct = products.find((prod) => prod.id === id);

  if (!updatedProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      ...updatedProduct,
      ...updateValues,
    },
    { status: 200 }
  );
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const deletedProduct = products.find((prod) => prod.id === id);

  if (!deletedProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(deletedProduct, { status: 200 });
}
