import { Metadata } from "next";
import NewsDetailClient from "./NewsDetailClient";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

import dbConnect from '@/lib/db';
import NewsPost from '@/lib/models/NewsPost';
import mongoose from 'mongoose';

async function getNewsPost(slug: string) {
  await dbConnect();
  let item;
  if (mongoose.Types.ObjectId.isValid(slug)) {
    item = await NewsPost.findById(slug).lean();
  } else {
    item = await NewsPost.findOne({ slug }).lean();
  }
  if (!item) return null;
  return { ...item, _id: item._id.toString(), createdAt: item.createdAt?.toISOString(), updatedAt: item.updatedAt?.toISOString() };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsPost(slug);
  if (!item) return { title: "News Not Found — Codematics" };
  return {
    title: `${item.title} — Codematics News`,
    description: item.description,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsPost(slug);
  if (!item) notFound();
  return <NewsDetailClient item={item} />;
}
