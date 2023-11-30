import { NextResponse } from "next/server";
const  {AUTH_TOKEN}  = process.env

export async function middleware( request ) {
    const token = request.cookies.get(AUTH_TOKEN)
    if(request.nextUrl.pathname.includes('/api') 
    && request.method === 'GET' 
    && !request.nextUrl.pathname.includes('/api/auth') 
    && !request.nextUrl.pathname.includes('/api/calendario')
    && !request.nextUrl.pathname.includes('/api/citas')) {
        if(token === undefined) {
            return NextResponse.redirect(new URL('/oficina', request.url))
        }
    }
    return NextResponse.next();
}