// /app/api/services/[id]/route.js
import dbConnect from '@/lib/db';
import Service from '@/lib/models/Service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await dbConnect();
    let service;
    if (mongoose.Types.ObjectId.isValid(id)) {
      service = await Service.findById(id);
    } else {
      service = await Service.findOne({ slug: id });
    }
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(service);
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
    const service = await Service.findByIdAndUpdate(id, data, { new: true });
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(service);
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
    const service = await Service.findByIdAndDelete(id);
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
