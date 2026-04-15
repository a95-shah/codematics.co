import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

import dbConnect from '@/lib/db';
import Service from '@/lib/models/Service';
import mongoose from 'mongoose';

async function getService(slug: string) {
  await dbConnect();
  let service;
  if (mongoose.Types.ObjectId.isValid(slug)) {
    service = await Service.findById(slug).lean();
  } else {
    service = await Service.findOne({ slug }).lean();
  }
  if (!service) return null;
  return { ...service, _id: service._id.toString(), createdAt: service.createdAt?.toISOString(), updatedAt: service.updatedAt?.toISOString() };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service Not Found — Codematics" };
  return {
    title: `${service.title} — Codematics Services Pvt Ltd`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  return <ServiceDetailClient service={service} />;
}
