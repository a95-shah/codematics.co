import dbConnect from '@/lib/db';
import NewsPost from '@/lib/models/NewsPost';
import NewsAnimatedClient from './NewsAnimatedClient';

export const dynamic = 'force-dynamic';

async function getNews() {
  await dbConnect();
  const news = await NewsPost.find({ isActive: true }).sort({ date: -1 }).lean();
  return news.map(n => ({
    ...n,
    _id: n._id.toString(),
    createdAt: n.createdAt?.toISOString(),
    updatedAt: n.updatedAt?.toISOString()
  }));
}

export default async function NewsPage() {
  const news = await getNews();
  return <NewsAnimatedClient news={news} />;
}
