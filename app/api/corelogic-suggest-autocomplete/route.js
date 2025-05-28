import { getCoreLogicAccessToken, getCoreLogicSuggestions, getCorelogicPropertyDetail} from "@/lib/corelogic-api";

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
    // 1. Get suggestions
    const suggestionsData = await getCoreLogicSuggestions(token, query);
    const suggestions = suggestionsData?.suggestions;
    if (!suggestions || !suggestions.length) {
      return new Response(JSON.stringify({ error: 'No suggestions found' }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const propertyId = suggestions[0].propertyId;
    /*
    // 2. Get property detail
    const propertyDetail = await getCorelogicPropertyDetail(token, propertyId);
    const localityId = propertyDetail?.locality?.id;
    if (!localityId) {
      return new Response(JSON.stringify({ error: 'No locality id found in property detail' }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }*/

    // Return both suggestions and statistics
    return new Response(JSON.stringify({ suggestions }), {
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

