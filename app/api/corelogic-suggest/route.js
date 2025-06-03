import { getCoreLogicAccessToken, getCoreLogicSuggestions, getCorelogicPropertyDetail, getCoreLogicMedianSalePrice, getCoreLogicAnnualChangeInMedianPrice, getCoreLogicPropertiesSold, getCoreLogicMedianDaysOnMarket, getCoreLogicMedianAskingRent, getCoreLogicAverageHoldPeriod, getCoreLogicReport  } from "@/lib/corelogic-api";

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

    // 2. Get property detail
    const propertyDetail = await getCorelogicPropertyDetail(token, propertyId);
    const localityId = propertyDetail?.locality?.id;
    if (!localityId) {
      return new Response(JSON.stringify({ error: 'No locality id found in property detail' }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }


    const report = await getCoreLogicReport(token, propertyId);
    // 3. Get statistics
    // 3.1 get Median Sale Price (12 mo)
    const statistics = await getCoreLogicMedianSalePrice(token, localityId);
    // 3.2 get Annual Change in Median Price (5 yrs)
    const statisticsAnnualChangeInMedianPrice = await getCoreLogicAnnualChangeInMedianPrice(token, localityId);
    // 3.3 get Properties Sold (12 mo)
    const statisticsPropertiesSold = await getCoreLogicPropertiesSold(token, localityId);
    // 3.4 get Median Days on Market (12 mo)
    const statisticsMedianDaysOnMarket = await getCoreLogicMedianDaysOnMarket(token, localityId);
    // 3.5 get Median Asking Rent (12 mo)
    const statisticsMedianAskingRent = await getCoreLogicMedianAskingRent(token, localityId);
    // 3.6 get Avg. Hold Period (12 mo)
    const statisticsAverageHoldPeriod = await getCoreLogicAverageHoldPeriod(token, localityId);

    // Return both suggestions and statistics
    return new Response(JSON.stringify({ suggestions, statistics, statisticsPropertiesSold, statisticsMedianDaysOnMarket, statisticsAnnualChangeInMedianPrice, statisticsMedianAskingRent, statisticsAverageHoldPeriod, report }), {
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

