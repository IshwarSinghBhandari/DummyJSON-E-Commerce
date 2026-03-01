import { COOKIE_NAME, ERROR_MESSAGE, SUCCESS_MESSAGE } from "@/app/util/constant";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieData = await cookies();
        cookieData.delete(COOKIE_NAME.ACCESS_TOKEN);
        cookieData.delete(COOKIE_NAME.REFRESH_TOKEN);
        return NextResponse.json({ message: SUCCESS_MESSAGE.LOGOUT_SUCCESS });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: ERROR_MESSAGE.LOGOUT_ERROR },
            { status: 500 }
        );
    }
}
