import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';
import ProductsAnimatedClient from './ProductsAnimatedClient';

export const dynamic = 'force-dynamic';

async function getProducts() {
  await dbConnect();
  const products = await Product.find({ isActive: true }).lean();
  return products.map(p => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString()
  }));
}

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsAnimatedClient products={products} />;
}
