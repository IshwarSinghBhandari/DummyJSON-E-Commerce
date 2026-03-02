"use client";

import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { ProductPaginationTypes } from "@/app/types/product";

const ProductPagination: React.FC<ProductPaginationTypes> = ({
    total,
    limit,
    skip,
    onPageChange,
}) => {
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor(skip / limit) + 1;

    if (total <= limit) return null;

    const renderPageLinks = () => {
        const links = [];
        const maxVisible = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            links.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href="#"
                        isActive={currentPage === i}
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange((i - 1) * limit);
                        }}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            links.push(
                <PaginationItem key="ellipsis">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        return links;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 py-10 px-10 rounded-[8px] border  shadow-sm relative">


            <div className="text-sm tracking-tight">
                Showing{" "}
                <span className=" text-lg font-semibold">{skip + 1}</span>{" "}
                to{" "}
                <span className=" text-lg font-semibold">{Math.min(skip + limit, total)}</span>{" "}
                of{" "}
                <span className=" text-lg font-semibold">{total}</span>{" "}
                products
            </div>

            <Pagination className="w-auto mx-0">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (skip > 0) onPageChange(skip - limit);
                            }}
                            className={skip === 0 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {renderPageLinks()}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (skip + limit < total) onPageChange(skip + limit);
                            }}
                            className={skip + limit >= total ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default ProductPagination;
