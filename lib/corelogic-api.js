import axios from "axios";

const clientId = process.env.CORE_LOGIC_CLIENT_KEY;
const clientSecret = process.env.CORE_LOGIC_CLIENT_SECRET;
const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

// Module-scoped cache for the CoreLogic token
let cachedToken = null;
let cachedTokenExpiry = 0; // timestamp in ms

export async function getCoreLogicAccessToken() {
  const now = Date.now();
  // Use a 5-minute buffer before expiry (token usually lasts 3299s)
  if (cachedToken && cachedTokenExpiry > now + 5 * 60 * 1000) {
    return cachedToken;
  }
  try {
    const response = await axios.post(
      "https://api-sbox.corelogic.asia/access/as/token.oauth2?grant_type=client_credentials",
      null, // No body content, just headers
      {
        headers: {
          "Content-Length": "0",
          Authorization: `Basic ${base64Credentials}`,
        },
      }
    );
    const token = response.data.access_token;
    const expiresIn = response.data.expires_in || 3299; // seconds
    cachedToken = token;
    cachedTokenExpiry = now + expiresIn * 1000;
    return token;
  } catch (error) {
    console.error("Failed to get CoreLogic access token:", error.response?.data || error.message);
    return null;
  }
}



export async function getCoreLogicSuggestions(token, query = "QLD") {
  try {
    const url = "https://api-sbox.corelogic.asia/property/au/v2/suggest.json";
    const fullUrl = `${url}?q=${encodeURIComponent(query)}`;
    console.log("CoreLogic suggest full URL:", fullUrl);
    const response = await axios.get(
      "https://api-sbox.corelogic.asia/property/au/v2/suggest.json",
      {
        params: { q: query },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log("CoreLogic suggest response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to get CoreLogic suggestions:", error.response?.data || error.message);
    throw error;
  }
}

// Fetch property details location by propertyId
export async function getCorelogicPropertyDetail(token, propertyId) {
  try {
    const url = `https://api-sbox.corelogic.asia/property-details/au/properties/${propertyId}/location`;
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log("CoreLogic property detail response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to get CoreLogic property detail:", error.response?.data || error.message);
    throw error;
  }
}


export async function getCoreLogicMedianSalePrice(token, locationId) {
  try {
    const url = "https://api-sbox.corelogic.asia/statistics/v1/statistics.json";
    // Hardcoded request body as per user instruction
    const requestBody = {
      "seriesRequestList": [
        {
          "locationId": locationId,
          "locationTypeId": 8,
          "propertyTypeId": 1,
          "fromDate": "2010-01-01",
          "toDate": "2021-01-01",
          "metricTypeId": 21,
          "interval": 12
        }
      ]
    };
    const response = await axios.post(
      url,
      requestBody,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log("CoreLogic statistics response:", response.data);
    //console.log("CoreLogic statistics response:", JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error("Failed to get CoreLogic statistics:", error.response?.data || error.message);
    throw error;
  }
}

export async function getCoreLogicAnnualChangeInMedianPrice(token, locationId) {
  try {
    const url = "https://api-sbox.corelogic.asia/statistics/v1/statistics.json";
    // Hardcoded request body as per user instruction
    const requestBody = {
      "seriesRequestList": [
        {
          "locationId": locationId,
          "locationTypeId": 8,
          "propertyTypeId": 1,
          "fromDate": "2010-01-01",
          "toDate": "2021-01-01",
          "metricTypeId": 14,
          "interval": 12
        }
      ]
    };
    const response = await axios.post(
      url,
      requestBody,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log("CoreLogic statistics response:", response.data);
    //console.log("CoreLogic statistics response:", JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error("Failed to get CoreLogic statistics:", error.response?.data || error.message);
    throw error;
  }
}

export async function getCoreLogicPropertiesSold(token, locationId) {
  try {
    const url = "https://api-sbox.corelogic.asia/statistics/v1/statistics.json";
    // Hardcoded request body as per user instruction
    const requestBody = {
      "seriesRequestList": [
        {
          "locationId": locationId,
          "locationTypeId": 8,
          "propertyTypeId": 1,
          "fromDate": "2010-01-01",
          "toDate": "2021-01-01",
          "metricTypeId": 37,
          "interval": 12
        }
      ]
    };
    const response = await axios.post(
      url,
      requestBody,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log("CoreLogic statistics response:", response.data);
    //console.log("CoreLogic statistics response:", JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error("Failed to get CoreLogic statistics:", error.response?.data || error.message);
    throw error;
  }
}

export async function getCoreLogicMedianDaysOnMarket(token, locationId) {
  try {
    const url = "https://api-sbox.corelogic.asia/statistics/v1/statistics.json";
    // Hardcoded request body as per user instruction
    const requestBody = {
      "seriesRequestList": [
        {
          "locationId": locationId,
          "locationTypeId": 8,
          "propertyTypeId": 1,
          "fromDate": "2010-01-01",
          "toDate": "2021-01-01",
          "metricTypeId": 32,
          "interval": 12
        }
      ]
    };
    const response = await axios.post(
      url,
      requestBody,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log("CoreLogic statistics response:", response.data);
    //console.log("CoreLogic statistics response:", JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error("Failed to get CoreLogic statistics:", error.response?.data || error.message);
    throw error;
  }
}

export async function getCoreLogicMedianAskingRent(token, locationId) {
  try {
    const url = "https://api-sbox.corelogic.asia/statistics/v1/statistics.json";
    // Hardcoded request body as per user instruction
    const requestBody = {
      "seriesRequestList": [
        {
          "locationId": locationId,
          "locationTypeId": 8,
          "propertyTypeId": 1,
          "fromDate": "2010-01-01",
          "toDate": "2021-01-01",
          "metricTypeId": 49,
          "interval": 12
        }
      ]
    };
    const response = await axios.post(
      url,
      requestBody,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log("CoreLogic statistics response:", response.data);
    //console.log("CoreLogic statistics response:", JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error("Failed to get CoreLogic statistics:", error.response?.data || error.message);
    throw error;
  }
}


export async function getCoreLogicAverageHoldPeriod(token, locationId) {
  try {
    const url = "https://api-sbox.corelogic.asia/statistics/v1/statistics.json";
    // Hardcoded request body as per user instruction
    const requestBody = {
      "seriesRequestList": [
        {
          "locationId": locationId,
          "locationTypeId": 8,
          "propertyTypeId": 1,
          "fromDate": "2010-01-01",
          "toDate": "2021-01-01",
          "metricTypeId": 4,
          "interval": 12
        }
      ]
    };
    const response = await axios.post(
      url,
      requestBody,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log("CoreLogic statistics response:", response.data);
    //console.log("CoreLogic statistics response:", JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error("Failed to get CoreLogic statistics:", error.response?.data || error.message);
    throw error;
  }
}





/*

1. suggest --> dapetin alamat full,, "2 Albert Avenue Broadbeach QLD 4218"
 {
  suggestions: [
    {
      councilAreaId: 284,
      countryId: 113,
      isActiveProperty: true,
      isBodyCorporate: false,
      isUnit: false,
      localityId: 3723,
      postcodeId: 300303,
      propertyId: 47872329,
      stateId: 3,
      streetId: 38135,
      suggestion: '2 Albert Avenue Broadbeach QLD 4218',
      suggestionType: 'address'
    },
  ]
}

->propertyId: 47872329
2. property-details-location (/property-details/au/properties/{propertyId}/location) --> untuk dapetin locality id,
{
  singleLine: '2 Albert Avenue Broadbeach QLD 4218',
  councilArea: 'Gold Coast City',
  councilAreaId: 284,
  state: 'QLD',
  street: {
    id: 38135,
    singleLine: 'Albert Avenue Broadbeach QLD 4218',
    name: 'ALBERT',
    nameAndNumber: '2 ALBERT AVENUE ',
    extension: 'AVENUE',
    locallyFormattedStreet: 'Albert Avenue, Broadbeach'
  },
  postcode: { id: 300303, singleLine: '4218 QLD', name: '4218' },
  locality: {
    id: 3723,
    singleLine: 'Broadbeach QLD 4218',
    name: 'BROADBEACH',
    locallyFormattedLocality: 'Broadbeach'
  },
  isDerivedUnit: false,
  startNumber: 2,
  externalReference: [ {}, {} ],
  isActiveProperty: true
}

3. statistics --> dapetin statistics,
https://api-sbox.corelogic.asia/statistics/v1/statistics.json,
{
    "seriesRequestList": [
        {
            "locationId": "3723",
            "locationTypeId": 8,
            "propertyTypeId": 1,
            "fromDate": "2010-01-01",
            "toDate": "2021-01-01",
            "metricTypeId": 21,
            "interval": 12
        } 
    ]
}
*/




/*

/*
koens — Yesterday at 10:23 PM
median sale price = 21
Annual change in median price = “51” to “57”
Properties sold = 37
Median days on market = 32

koens — Yesterday at 10:35 PM
Median asking rent = 49
koens — Yesterday at 10:44 PM
Median days on market
(12 months) = Property - OTM rental or OTM sales
campaign (API)
Median asking rent
(12 months)  = Property - OTM rental or OTM sales
campaign (API)
Avg. hold period
(12 months)   = Property - OTM rental or OTM sales
campaign (API)

*/