import { ERROR_MESSAGE } from "@/app/util/constant";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const searchData = searchParams.get("searchData");
        const category = searchParams.get("category");
        const limit = searchParams.get("limit") || "12";
        const skip = searchParams.get("skip") || "0";
        const sortBy = searchParams.get("sortBy");
        const order = searchParams.get("order");

        let url = `${process.env.BACKEND_BASE_URL}/products?limit=${limit}&skip=${skip}`;
        if (searchData) {
            url = `${process.env.BACKEND_BASE_URL}/products/search?q=${searchData}&limit=${limit}&skip=${skip}`;
        } else if (category && category !== 'all') {
            url = `${process.env.BACKEND_BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
        }

        if (sortBy) {
            const separator = url.includes('?') ? '&' : '?';
            url += `${separator}sortBy=${sortBy}&order=${order || 'asc'}`;
        }

        const response = await fetch(url, {
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