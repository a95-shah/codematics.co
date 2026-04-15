// /app/api/team/route.js
import dbConnect from '@/lib/db';
import TeamMember from '@/lib/models/TeamMember';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get('active') === 'true';
    const query = activeOnly ? { isActive: true } : {};
    const team = await TeamMember.find(query).sort({ order: 1 });
    return NextResponse.json(team);
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
    const member = await TeamMember.create(data);
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
