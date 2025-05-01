// src/app/api/reports/route.js

let mockReports = []; // This persists across requests until server restart

export async function POST(req) {
  try {
    const { content, createdAt } = await req.json();

    if (!content || typeof content !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid report content' }),
        { status: 400 }
      );
    }

    const newReport = {
      id: Date.now(),
      content,
      createdAt: createdAt || new Date().toISOString(),
    };

    mockReports.push(newReport);

    console.log('📥 Saved report:', newReport);

    return new Response(
      JSON.stringify({ message: 'Report saved', report: newReport }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error while saving the report:', error);
    return new Response(
      JSON.stringify({ error: 'Unexpected error occurred' }),
      { status: 500 }
    );
  }
}

export async function GET() {
  return new Response(JSON.stringify(mockReports), { status: 200 });
}
