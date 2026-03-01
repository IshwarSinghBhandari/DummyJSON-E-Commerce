import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTE } from '@/app/util/pageRoutes'
import { COOKIE_NAME } from './app/util/constant'

export function proxy(request: NextRequest) {
    const token = request.cookies.get(COOKIE_NAME.ACCESS_TOKEN)?.value
    const { pathname } = request.nextUrl
    const isPublicRoute = pathname === ROUTE.LOGIN
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL(ROUTE.LOGIN, request.url))
    }
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL(ROUTE.HOME, request.url))
    }

    return NextResponse.next()
}
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)',
    ],
}
