// /app/api/contact/[id]/route.js
import dbConnect from '@/lib/db';
import ContactMessage from '@/lib/models/ContactMessage';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await dbConnect();
    const message = await ContactMessage.findById(id);
    if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(message);
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
    const message = await ContactMessage.findByIdAndUpdate(id, data, { new: true });
    if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(message);
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
    const message = await ContactMessage.findByIdAndDelete(id);
    if (!message) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
