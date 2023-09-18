import { NextResponse } from "next/server";
//import { verify } from "jsonwebtoken";

export async function middleware( request ) {
    const token = request.cookies.get("next-auth.session-token")
    //const secret = process.env.NEXTAUTH_SECRET;

    if(request.nextUrl.pathname.includes('/api') && request.method === 'GET' && !request.nextUrl.pathname.includes('/api/auth')) {
        if(token === undefined) {
            return NextResponse.redirect(new URL('/oficina', request.url))
        }
        // try {
        //     // console.log("Adentro");
        //     const payload = verify(token.value,secret)
        //     console.log("PAYLOAD",payload)
        // } catch (error) {
        //     console.log("error",error)
        //     //return NextResponse.redirect(new URL('/oficina', request.url))
        // }
    }
    return NextResponse.next();
}