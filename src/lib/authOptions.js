// /lib/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Fallback for demonstration/simplicity given deployment issues
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@codematics.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        console.log('Auth attempt:', { email: credentials.email, adminEmail });

        if (
          credentials.email === adminEmail &&
          credentials.password === adminPassword
        ) {
          return { id: "1", name: "Admin", email: adminEmail };
        }
        
        console.warn('Auth failed for:', credentials.email);
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || 'a-very-secret-fallback-key-926aef6c9d8e7d77f8d38e76c12f7b88',
};
