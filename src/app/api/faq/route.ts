import { NextResponse } from 'next/server';
import { client } from '../../../../sanity/lib/client';
import { faqPageQuery } from '../../../../sanity/lib/queries';

export const revalidate = 60;

export async function GET() {
  try {
    const data = await client.fetch(faqPageQuery);
    return NextResponse.json(data || {});
  } catch {
    return NextResponse.json({});
  }
}
