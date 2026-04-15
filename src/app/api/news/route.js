// /app/api/news/route.js
import dbConnect from '@/lib/db';
import NewsPost from '@/lib/models/NewsPost';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get('active') === 'true';
    const query = activeOnly ? { isActive: true } : {};
    const news = await NewsPost.find(query).sort({ createdAt: -1 });
    return NextResponse.json(news);
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
    const newsItem = await NewsPost.create(data);
    return NextResponse.json(newsItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
