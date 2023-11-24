import { NextResponse } from "next/server";

export async function middleware( request ) {
    const token = request.cookies.get("__Secure-next-auth.session-token")
    if(request.nextUrl.pathname.includes('/api') && request.method === 'GET' && !request.nextUrl.pathname.includes('/api/auth')) {
        if(token === undefined) {
            return NextResponse.redirect(new URL('/oficina', request.url))
        }
    }
    return NextResponse.next();
}
