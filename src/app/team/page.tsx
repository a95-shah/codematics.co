import type { Metadata } from "next";
import TeamPageClient from "./TeamPageClient";

export const metadata: Metadata = {
  title: "Our Team — Codematics Services Pvt Ltd",
  description: "Meet the talented and diverse team behind Codematics — leaders, engineers, designers, and innovators driving software excellence.",
};

import dbConnect from '@/lib/db';
import TeamMember from '@/lib/models/TeamMember';

async function getTeam() {
  await dbConnect();
  const team = await TeamMember.find({ isActive: true }).sort('order').lean();
  return team.map(m => ({
    ...m,
    _id: m._id.toString(),
    createdAt: m.createdAt?.toISOString(),
    updatedAt: m.updatedAt?.toISOString()
  }));
}

export default async function TeamPage() {
  const teamMembers = await getTeam();
  return <TeamPageClient members={teamMembers} />;
}
