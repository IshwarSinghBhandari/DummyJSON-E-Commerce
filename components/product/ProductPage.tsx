"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowDown, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/app/types/product";
import { Category } from "@/app/types/category";
import ProductCard from "@/components/common/ProductCard";
import ProductPagination from "./ProductPagination";
import ProductHeader from "./ProductHeader";
import { LIMIT } from "@/app/util/constant";
import { useEffect, useState } from "react";

function ProductPage({
    category,
    products,
    total,
    searchParams,
}: {
    category: string[];
    products: Product[];
    total: number;
    searchParams: any; 
}) {

    // console.log("catwgory",category)
    const search = searchParams?.search || "";
    const params = useSearchParams();

    const [searchValue, setSearchValue] = useState(search);
    const router = useRouter();

    const selectedCategory = params.get("category") || "all";
const skip = Number(params.get("skip")) || 0;
    const sortBy = params.get("sortBy") || "";
    const order = params.get("order") || "asc";
    const categories: Category[] = category.map((cat) => ({
        slug: cat,
        name: cat.replace("-", " "),
        url: "",
    }));

    const updateURL = (params: URLSearchParams) => {
        router.push(`?${params.toString()}`);
    };
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        const params = new URLSearchParams(window.location.search);
        if (value) params.set("search", value);
        else params.delete("search");
        params.set("skip", "0");

        updateURL(params);
    };
    const onCategoryChange = (category: string) => {
        const params = new URLSearchParams(window.location.search);
        params.delete("search");
        setSearchValue("");
        if (category === "all") params.delete("category");
        else params.set("category", category);
        params.set("skip", "0");
        updateURL(params);
    };

    const onSortChange = (newSortBy: string, newOrder: "asc" | "desc") => {
        const params = new URLSearchParams(window.location.search);
        params.set("sortBy", newSortBy);
        params.set("order", newOrder);
        params.set("skip", "0");
        updateURL(params);
    };

    const onPageChange = (newSkip: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set("skip", newSkip.toString());
        updateURL(params);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {

        const timeout = setTimeout(() => {

            const params = new URLSearchParams(window.location.search);
            if (searchValue) params.set("search", searchValue);
            else params.delete("search");
            params.set("skip", "0");
            updateURL(params);

        }, 500);

        return () => clearTimeout(timeout);

    }, [searchValue]);
    return (

        <div className="min-h-screen">
            <div className="mx-auto py-12 space-y-12">
                <ProductHeader
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={onCategoryChange}
                    search={searchValue}
                    onSearchChange={onSearchChange}
                    sortBy={sortBy}
                    order={order}
                    onSortChange={onSortChange}
                />

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => router.push(`/${product.id}`)}
                            />
                        ))}
                    </div>
                ) : (

                    <div className="flex flex-col items-center justify-center py-24 px-6 text-center border rounded-[8px]">
                        <Package className="h-12 w-12 text-gray-500 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">
                            No products found
                        </h2>
                        <p className="text-gray-500 max-w-md">
                            Clear filters to view all products
                        </p>
                        <ArrowDown className="h-6 w-6 my-4" />
                        <Button
                            variant="outline"
                            onClick={() => router.push("/")} >
                            Clear Filters
                        </Button>
                    </div>

                )}

                <ProductPagination
                    total={total}
                    limit={LIMIT}
                    skip={skip}
                    onPageChange={onPageChange}
                />

            </div>

        </div>
    );
}

export default ProductPage;