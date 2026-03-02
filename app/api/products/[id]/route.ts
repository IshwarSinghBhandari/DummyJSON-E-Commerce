import { ERROR_MESSAGE } from "@/app/util/constant";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { error: ERROR_MESSAGE.INVALID_ID },
                { status: 400 }
            );
        }

        const response = await fetch(
            `${process.env.BACKEND_BASE_URL}/products/${id}`,
            { cache: "no-store" }
        );

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
