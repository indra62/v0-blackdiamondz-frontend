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
    return response.data;
  } catch (error) {
    console.error("Failed to get CoreLogic suggestions:", error.response?.data || error.message);
    throw error;
  }
}