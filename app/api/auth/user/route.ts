import { COOKIE_NAME, ERROR_MESSAGE } from "@/app/util/constant";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { POST as refreshToken } from "../refreshtoken/refreshtoken";

export async function GET() {
    try {
        const cookieData = await cookies();
        const token = cookieData.get(COOKIE_NAME.ACCESS_TOKEN)?.value;
        console.log("Access token from cookies:", token);
        if (!token) {
            return NextResponse.json({ error: ERROR_MESSAGE.UNAUTHORIZED }, { status: 401 });
        }

        let response = await fetch(`${process.env.BACKEND_BASE_URL}/auth/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            const refreshResponse = await refreshToken();

            if (!refreshResponse.ok) {
                return NextResponse.json({ error: 'ERROR_MESSAGE.UNAUTHORIZED' }, { status: 401 });
            }
            const refreshedCookies = await cookies();
            const newToken = refreshedCookies.get(COOKIE_NAME.ACCESS_TOKEN)?.value;
            if (!newToken) {
                return NextResponse.json({ error: ERROR_MESSAGE.UNAUTHORIZED }, { status: 401 });
            }

            
            response = await fetch(`${process.env.BACKEND_BASE_URL}/auth/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${newToken}`,
                },
            });
        }

        if (!response.ok) {
            return NextResponse.json({ error: ERROR_MESSAGE.FAILED_TO_FETCH_USER }, { status: response.status });
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (e) {
        console.error("Error fetching user data:", e);
        return NextResponse.json({ error: ERROR_MESSAGE.SOMETHING_WENT_WRONG },
            { status: 500 });
    }
}
