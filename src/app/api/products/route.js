export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received product:", body); // You’ll see the Base64 image here
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Failed to parse JSON", error);
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }
}
