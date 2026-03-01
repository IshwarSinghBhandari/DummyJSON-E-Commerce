import { ERROR_MESSAGE } from "@/app/util/constant";
import { NextResponse } from "next/server";

export async function GET() {
    // console.log("0---------------", process.env.BACKEND_BASE_URL)
    try {
        const response = await fetch(`${process.env.BACKEND_BASE_URL}/products`,
            {
                cache: 'no-store',
            }
        );
        const data = await response.json();
        // console.log("1---------------", data)
        return NextResponse.json(data);
    }
    catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: ERROR_MESSAGE.SOMETHING_WENT_WRONG },
            { status: 500 }
        )
    }
}