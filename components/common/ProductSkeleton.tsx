"use client";

import React from 'react';
import { Card, } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductSkeleton } from '@/app/types/product';

export const ProductCardSkeleton = () => {
    return (
        <Card className="mx-auto max-w-sm w-full  overflow-hidden rounded-[8px] shadow-sm  border border-gray-100">
            <Skeleton className="h-50 w-full" />
            <div className="p-4 space-y-4 ">
                <Skeleton className="h-5  w-[70%]" />
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-4 w-4 rounded-full" />
                    ))}
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-3 w-full " />
                    <Skeleton className="h-3 w-[90%]" />
                </div>
                <div className="flex justify-between  items-center pt-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                </div>
            </div>
        </Card>
    );
};
const ProductSkeleton: React.FC<ProductSkeleton> = ({ count = 8, className = "" }) => {
    return (
        <div className={`grid sm:grid-cols-2 grid-cols-1   lg:grid-cols-3 xl:grid-cols-4 gap-8 ${className}`}>
            {[...Array(count)].map((_, i) => (

                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
};

export default ProductSkeleton;
