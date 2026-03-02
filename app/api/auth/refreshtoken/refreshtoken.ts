import { COOKIE_NAME, ERROR_MESSAGE } from "@/app/util/constant";
import { ROUTE } from "@/app/util/pageRoutes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const REFRESH_COOKIE_MAX_AGE_SECONDS = (() => {
    const raw = process.env.REFRESH_COOKIE_MAX_AGE_SECONDS;
    if (!raw) return 60 * 60 * 24 * 7;
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 60 * 60 * 24 * 7;
})();

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get(COOKIE_NAME.REFRESH_TOKEN)?.value;
        if (!refreshToken) {
            return NextResponse.json({ error: ERROR_MESSAGE.NO_TOKEN }, { status: 401 });
        }

        const response = await fetch(`${process.env.BACKEND_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
            },
            body: JSON.stringify({
                refreshToken:`${refreshToken}`,
                expiresInMins: 30,
              }),
              credentials: 'include'
        });
        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || ERROR_MESSAGE.UNAUTHORIZED },
                { status: response.status }
            );
        }
        if (data.accessToken) {
            cookieStore.set(COOKIE_NAME.ACCESS_TOKEN, data.accessToken, {
                httpOnly: true,
                secure: true,
                path: ROUTE.HOME,
            });
            
        }
        if (data.refreshToken) {
            cookieStore.set(COOKIE_NAME.REFRESH_TOKEN, data.refreshToken, {
                httpOnly: true,
                secure: true,
                path: ROUTE.HOME,
                maxAge: REFRESH_COOKIE_MAX_AGE_SECONDS,
            });
        }

        return NextResponse.json(
            { message: "Token refreshed successfully" },
            { status: 200 }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: ERROR_MESSAGE.SOMETHING_WENT_WRONG },
            { status: 500 }
        );
    }
    }