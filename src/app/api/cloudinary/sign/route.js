// src/app/api/cloudinary/sign/route.js
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;
    
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign, 
      process.env.CLOUDINARY_API_SECRET
    );
    
    return Response.json({ signature });
  } catch (error) {
    console.error('Cloudinary Signature Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
