import { NextResponse } from 'next/server';

export async function POST(request) {
  // Note: In App Router, you don't need to check req.method.
  // The function name POST itself handles only POST requests.
  // If a different method is used, Next.js will automatically return a 405.

  let email, firstname, lastname, phone, hs_country_region_code, city_id, property_type, sale_type, property_address, message;
  try {
    const body = await request.json();
    email = body.email;
    firstname = body.firstname;
    lastname = body.lastname;
    phone = body.phone;
    hs_country_region_code= body.country_id;
    city_id = body.city_id;
    property_type = body.property_type;
    sale_type = body.sale_type;
    property_address = body.property_address;
    message = body.message;

    if (!email || !firstname || !lastname || !phone || !hs_country_region_code || !city_id || !property_type || !sale_type || !property_address || !message) {
      return NextResponse.json({ message: 'Missing required fields: email, firstname, lastname, phone, country_id, city_id, property_type, sale_type, property_address, message' }, { status: 400 });
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  try {
    const hubSpotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          email,
          firstname,
          lastname,
          phone,
          hs_country_region_code,
          city_id,
          property_type,
          sale_type,
          property_address,
          message,
        },
      }),
    });

    const responseData = await hubSpotResponse.json(); // Parse JSON regardless of status to get error details

    if (!hubSpotResponse.ok) {
      // Log the detailed error from HubSpot
      console.error("HubSpot API Error:", responseData);
      return NextResponse.json({ message: 'Failed to add contact to HubSpot', error: responseData }, { status: hubSpotResponse.status });
    }

    return NextResponse.json({ message: 'Contact added!', data: responseData }, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error in HubSpot route:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}