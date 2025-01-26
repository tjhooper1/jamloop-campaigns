// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

// Only match routes other than '/', '/login', '_next/static', etc.
export const config = {
  matcher: [
    /*
      Match all request paths except for:
      - root `/`
      - `/login`
      - `/api/(.*)` if you don’t want to protect API routes
      - Next.js internal files like `/_next/`
    */
    '/((?!_next|login|api|favicon.ico).*)',
  ],
};
