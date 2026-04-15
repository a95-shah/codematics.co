import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';
import mongoose from 'mongoose';

async function getProduct(slug: string) {
  await dbConnect();
  let product;
  if (mongoose.Types.ObjectId.isValid(slug)) {
    product = await Product.findById(slug).lean();
  } else {
    product = await Product.findOne({ slug }).lean();
  }
  if (!product) return null;
  return { ...product, _id: product._id.toString(), createdAt: product.createdAt?.toISOString(), updatedAt: product.updatedAt?.toISOString() };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found — Codematics" };
  return {
    title: `${product.title} — Codematics Services Pvt Ltd`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
