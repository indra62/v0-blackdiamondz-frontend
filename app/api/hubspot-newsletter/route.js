import { NextResponse } from 'next/server';

export async function POST(request) {
  let email;
  try {
    const body = await request.json();
    email = body.email;
    if (!email) {
      return NextResponse.json({ message: 'Missing required field: email' }, { status: 400 });
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  try {
    // 1. Ensure contact exists in HubSpot (create if not)
    // 1. Search for the contact by email
    let contactId = null;
    let created = false;
    const searchResp = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filterGroups: [
          { filters: [ { propertyName: 'email', operator: 'EQ', value: email } ] }
        ],
        properties: ['email']
      }),
    });
    if (!searchResp.ok) {
      const err = await searchResp.text();
      console.error('Failed to search for contact:', err);
      return NextResponse.json({ message: 'Failed to search for contact', error: err }, { status: searchResp.status });
    }
    const found = await searchResp.json();
    if (found.results && found.results.length > 0) {
      // Contact exists, update lifecyclestage
      contactId = found.results[0].id;
      const patchResp = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties: { newsletter_subscriber: true } }),
      });
      const patchBody = await patchResp.text();
      console.log('[HubSpot PATCH newsletter_subscriber]', {
        status: patchResp.status,
        ok: patchResp.ok,
        response: patchBody
      });
      if (!patchResp.ok) {
        console.error('Failed to update newsletter_subscriber:', patchBody);
        return NextResponse.json({ message: 'Failed to update newsletter_subscriber', error: patchBody }, { status: patchResp.status });
      }
    } else {
      // Contact does not exist, create new
      const contactCreateResp = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties: { email, newsletter_subscriber: true } }),
      });
      if (contactCreateResp.ok) {
        const data = await contactCreateResp.json();
        contactId = data.id;
        created = true;
      } else {
        const err = await contactCreateResp.text();
        console.error('Failed to create contact in HubSpot:', err);
        return NextResponse.json({ message: 'Failed to create contact in HubSpot', error: err }, { status: contactCreateResp.status });
      }
    }
    return NextResponse.json({ message: 'Contact added as newsletter subscriber', contactId, created }, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error in HubSpot newsletter route:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
