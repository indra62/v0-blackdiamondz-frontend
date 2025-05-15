import { getCoreLogicAccessToken } from "@/lib/corelogic-api";

export async function GET(req) {
  try {
    const token = await getCoreLogicAccessToken();
    if (token) {
      return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: "Failed to get token" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
