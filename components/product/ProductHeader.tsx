"use client";

import React from 'react';
import { Search, ArrowUpDown, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CategoryFilter from './CategoryFilter';
import { ProductHeaderTypes } from '@/app/types/product';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { SORT_OPTIONS } from '@/app/util/constant';

const ProductHeader: React.FC<ProductHeaderTypes> = ({
    categories,
    selectedCategory,
    onCategoryChange,
    search,
    onSearchChange,
    sortBy,
    order,
    onSortChange
}) => {
    const sortLabel = SORT_OPTIONS.find(opt => opt.value === sortBy && opt.order === order)?.label || 'Sort By';

    return (
        <div className="flex flex-col gap-6 md:gap-10">
            <div className="flex flex-col md:items-start lg:flex-row justify-between items-start lg:items-end gap-6">
                <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl text-gray-700 font-black ">
                        Demo Cart Collection
                    </h1>
                    <p className="text-gray-500 text-lg max-w-md font-medium ">
                        Explore premium products from trusted brands worldwide.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row  sm:items-center gap-3 w-full md:w-auto">
                    <div className="flex flex-col sm:flex-row  sm:items-center gap-3 w-full md:w-auto">
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={onCategoryChange}
                        />

                        <DropdownMenu>

                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-12 w-full md:w-[180px] justify-between rounded-[8px] font-semibold transition-all px-4">
                                    <div className="flex items-center gap-2">
                                        <ArrowUpDown className="h-4 w-4" />
                                        <span className="truncate">{sortLabel}</span>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-full md:w-56 max-w-[90vw] rounded-[8px] p-2">
                                <DropdownMenuLabel className="font-bold text-xs uppercase tracking-[2px] opacity-50 px-2 py-3">
                                    Sort Options
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/5" />
                                {SORT_OPTIONS.map((opt) => (
                                    <DropdownMenuItem
                                        key={`${opt.value}-${opt.order}`}
                                        onClick={() => onSortChange(opt.value, opt.order as "asc" | "desc")}
                                        className={`rounded-[8px] py-2 cursor-pointer flex justify-between items-center ${sortBy === opt.value && order === opt.order ? "bg-primary/10 text-primary" : ""} focus:bg-primary focus:text-white`}
                                    >
                                        <span>{opt.label}</span>
                                        {sortBy === opt.value && order === opt.order && <Check className="h-4 w-4" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>

                        </DropdownMenu>
                    </div>

                    <div className="relative w-full md:max-w-[400px] group">
                        <Search className="absolute left-4 top-[12px] z-10 text-gray-600" />
                        <Input
                            placeholder="Search products. "
                            className="pl-12 h-12 rounded-[8px] text-lg "
                            value={search}
                            onChange={onSearchChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductHeader;
