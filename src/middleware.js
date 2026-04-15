import { withAuth } from "next-auth/middleware";

const authProxy = withAuth(
  function proxy(req) {
    // Custom proxy logic for Next.js 16
  },
  {
    pages: {
      signIn: "/admin/login",
    },
  }
);

export { authProxy as proxy };
export default authProxy;

export const config = {
  matcher: ["/admin/:path*"],
};


