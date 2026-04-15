// /app/api/pages/route.js
import dbConnect from '@/lib/db';
import Page from '@/lib/models/Page';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();
    const pages = await Page.find({});
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const data = await req.json();
    const page = await Page.create(data);
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
