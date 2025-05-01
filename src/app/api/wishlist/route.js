import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const product = await req.json(); // Parse the request body

    // Log the received product for debugging
    console.log("Wishlist item received:", product);

    // Simulate saving the product to a database
    if (product && product.title) {
      // You can store this in a database or temporary storage
      return NextResponse.json({ message: "Added to wishlist", product }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid product data" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: "GET method not allowed" }, { status: 405 });
}