// /app/api/pages/[slug]/route.js
import dbConnect from '@/lib/db';
import Page from '@/lib/models/Page';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    await dbConnect();
    const page = await Page.findOne({ slug });
    if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { slug } = await params;
    await dbConnect();
    const data = await req.json();
    data.updatedAt = Date.now();
    const page = await Page.findOneAndUpdate({ slug }, data, { new: true, upsert: true });
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
