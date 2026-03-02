import { COOKIE_NAME, ERROR_MESSAGE } from "@/app/util/constant";
import { ROUTE } from "@/app/util/pageRoutes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formdata = await req.json();
        const response = await fetch(`${process.env.BACKEND_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: formdata.username,
                password: formdata.password,
            }),
        });
        const data = await response.json();
        // console.log("data", data)

        if (!response.ok) {
            return NextResponse.json(
                { error: data.message || ERROR_MESSAGE.LOGIN_ERROR },
                { status: response.status }
            )
        }
        const token = data.accessToken || data.refreshToken;
        if (!token) {
            return NextResponse.json(
                { error: ERROR_MESSAGE.NO_TOKEN },
                { status: 500 }
            )
        }
        const cookieData = await cookies();
        cookieData.set(COOKIE_NAME.ACCESS_TOKEN, data.accessToken, {
            httpOnly: true,
            secure: true,
            path: ROUTE.HOME,
        })
        cookieData.set(COOKIE_NAME.REFRESH_TOKEN, data.refreshToken, {
            httpOnly: true,
            secure: true,
            path: ROUTE.HOME,
            maxAge: 60 * 60 * 24 * 7,
        })
        return NextResponse.json(data);
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: ERROR_MESSAGE.SOMETHING_WENT_WRONG },
            { status: 500 }
        )
    }
}