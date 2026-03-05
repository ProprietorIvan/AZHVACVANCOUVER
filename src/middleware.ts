import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Get the referer header to see where the user came from
    const referer = request.headers.get('referer');
    const userAgent = request.headers.get('user-agent');
    const currentPath = request.nextUrl.pathname;

    // Only process if user is coming to the homepage
    if (currentPath === '/') {
        // Check if user has already been redirected today
        const redirectCookie = request.cookies.get('domain_redirect_today');

        // If no redirect cookie exists, check the referer domain
        if (!redirectCookie && referer) {
            const refererUrl = new URL(referer);
            const refererDomain = refererUrl.hostname.toLowerCase();

            // Check for vancouver-demolition.com domain
            if (refererDomain.includes('vancouver-demolition.com')) {
                // Set cookie to prevent multiple redirects today
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0); // Reset to midnight

                const redirectResponse = NextResponse.redirect(new URL('/demolition', request.url));
                redirectResponse.cookies.set('domain_redirect_today', 'vancouver-demolition', {
                    expires: tomorrow,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                });

                return redirectResponse;
            }

            // Check for burnabydrywall.ca domain
            if (refererDomain.includes('burnabydrywall.ca')) {
                // Set cookie to prevent multiple redirects today
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0); // Reset to midnight

                const redirectResponse = NextResponse.redirect(new URL('/burnaby-drywall', request.url));
                redirectResponse.cookies.set('domain_redirect_today', 'burnabydrywall', {
                    expires: tomorrow,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                });

                return redirectResponse;
            }
        }
    }

    // Also check for direct domain access (when the request is coming directly from these domains)
    const host = request.headers.get('host');
    if (host && currentPath === '/') {
        const redirectCookie = request.cookies.get('domain_redirect_today');

        if (!redirectCookie) {
            if (host.includes('vancouver-demolition.com')) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);

                const redirectResponse = NextResponse.redirect(new URL('/demolition', request.url));
                redirectResponse.cookies.set('domain_redirect_today', 'vancouver-demolition', {
                    expires: tomorrow,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                });

                return redirectResponse;
            }

            if (host.includes('burnabydrywall.ca')) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);

                const redirectResponse = NextResponse.redirect(new URL('/burnaby-drywall', request.url));
                redirectResponse.cookies.set('domain_redirect_today', 'burnabydrywall', {
                    expires: tomorrow,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                });

                return redirectResponse;
            }
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.).*)',
    ],
};


