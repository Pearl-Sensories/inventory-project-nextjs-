export async function POST(req) {
    try {
      const data = await req.json();
      console.log("Received product:", data);
  
      // Simulate saving
      return new Response(JSON.stringify({ message: "Product saved" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Failed to process product", err);
      return new Response(JSON.stringify({ error: "Failed to save product" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  