// /app/api/news/[id]/route.js
import dbConnect from '@/lib/db';
import NewsPost from '@/lib/models/NewsPost';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    let newsItem;
    if (mongoose.Types.ObjectId.isValid(id)) {
      newsItem = await NewsPost.findById(id);
    } else {
      newsItem = await NewsPost.findOne({ slug: id });
    }
    if (!newsItem) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(newsItem);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    const data = await req.json();
    const newsItem = await NewsPost.findByIdAndUpdate(id, data, { new: true });
    if (!newsItem) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(newsItem);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    const newsItem = await NewsPost.findByIdAndDelete(id);
    if (!newsItem) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
