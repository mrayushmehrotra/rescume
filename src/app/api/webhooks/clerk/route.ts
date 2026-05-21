export async function GET() {
  return Response.json({ ok: true, message: "Clerk webhook endpoint ready" });
}

export async function POST() {
  return new Response("Webhook handling is not configured yet.", {
    status: 501,
  });
}
