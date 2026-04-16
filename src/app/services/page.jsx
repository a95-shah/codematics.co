import dbConnect from '@/lib/db';
import Service from '@/lib/models/Service';
import ServicesAnimatedClient from './ServicesAnimatedClient';

export const dynamic = 'force-dynamic';

async function getServices() {
  await dbConnect();
  const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
  return services.map(s => ({
    ...s,
    _id: s._id.toString(),
    createdAt: s.createdAt?.toISOString(),
    updatedAt: s.updatedAt?.toISOString()
  }));
}

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesAnimatedClient services={services} />;
}
