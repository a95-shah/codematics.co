// /app/api/remote-resources/[id]/route.js
import dbConnect from '@/lib/db';
import RemoteResource from '@/lib/models/RemoteResource';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    const resource = await RemoteResource.findById(id);
    if (!resource) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(resource);
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
    const resource = await RemoteResource.findByIdAndUpdate(id, data, { new: true });
    if (!resource) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(resource);
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
    const resource = await RemoteResource.findByIdAndDelete(id);
    if (!resource) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
