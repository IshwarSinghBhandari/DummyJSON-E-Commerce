import { ERROR_MESSAGE } from "@/app/util/constant";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const response = await fetch(`${process.env.BACKEND_BASE_URL}/products/category-list`, {
            cache: 'no-store',
        });

        const data = await response.json();
        return NextResponse.json(data);

    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: ERROR_MESSAGE.SOMETHING_WENT_WRONG },

            { status: 500 }
        );
    }
}
