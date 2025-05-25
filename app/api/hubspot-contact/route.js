import { NextResponse } from 'next/server';

export async function POST(request) {
  // Note: In App Router, you don't need to check req.method.
  // The function name POST itself handles only POST requests.
  // If a different method is used, Next.js will automatically return a 405.

  let email, firstname, lastname;
  try {
    const body = await request.json();
    email = body.email;
    firstname = body.firstname;
    lastname = body.lastname;

    if (!email || !firstname || !lastname) {
      return NextResponse.json({ message: 'Missing required fields: email, firstname, lastname' }, { status: 400 });
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