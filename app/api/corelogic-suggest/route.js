import { getCoreLogicAccessToken, getCoreLogicSuggestions } from "@/lib/corelogic-api";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "QLD";

  const token = await getCoreLogicAccessToken();
  if (!token) {
    return new Response(JSON.stringify({ error: "Failed to get token" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const data = await getCoreLogicSuggestions(token, query);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.response?.data || error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
