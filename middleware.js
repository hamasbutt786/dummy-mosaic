import { decode } from 'jsonwebtoken';
import { NextResponse } from 'next/server'
export function middleware(request) {
    const currentUser = request.cookies.get('Auth')?.value
    const path = request.nextUrl.pathname;
    let user;
    try {
        user = decode(currentUser)
        // console.log({ user,})
    } catch (error) {
        console.log(error)
    }
    if (path === '/clientid-verification' || path === '/verified' || path === '/clientid-verification') {
        return null
    }
    if (path === '/') {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (path === ['/api/auth'].includes(path)) {
        return null
    }
    if (!user && path !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (user?.email && ['/login'].includes(path)) {
        return NextResponse.redirect(new URL('/summary', request.url))
    }
    return null
}
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}