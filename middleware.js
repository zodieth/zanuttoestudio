import { NextResponse } from "next/server";

export async function middleware( request ) {
    const token = request.cookies.get("_Secure-next-auth.session-token")
    if(request.nextUrl.pathname.includes('/api') && request.method === 'GET' && !request.nextUrl.pathname.includes('/api/auth')) {
        if(request.nextUrl.pathname.includes('/api/citas') || request.nextUrl.pathname.includes('/api/calendario')){
            return NextResponse.next();
        }
        if(token === undefined) {
            return NextResponse.redirect(new URL('/oficina', request.url))
        }
    }
    return NextResponse.next();
}