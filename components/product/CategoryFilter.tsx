"use client";

import React, { useMemo } from "react";
import { Filter, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CategoryFilterProps } from "@/app/types/category";

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedCategory,
    onCategoryChange,
}) => {
    const currentCategory = useMemo(() => {
        if (selectedCategory === "all") return "All Categories";

        const found = categories.find(
            (category) => category.slug === selectedCategory
        );

        return found?.name ?? "All Categories";
    }, [selectedCategory, categories]);

    const getItemClasses = (isActive: boolean) =>
        `rounded-xl py-2 cursor-pointer flex justify-between items-center capitalize
     ${isActive ? "bg-primary/10 text-primary" : ""}
     focus:bg-primary focus:text-white`;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger >
                <Button
                    variant="outline"
                    className="h-12 w-full md:w-[200px] justify-between rounded-[8px] 
                     border-white/10  backdrop-blur-md 
                     font-semibold  transition-all px-4"
                >
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span className="truncate">{currentCategory}</span>
                    </div>

                    <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-56 rounded-[8px] p-2 max-h-[400px] overflow-y-auto"
            >
                <DropdownMenuLabel className="font-bold text-xs uppercase tracking-[2px] opacity-50 px-2 py-3">
                    Filter by Category
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-white/5" />

                <DropdownMenuItem
                    onClick={() => onCategoryChange("all")}
                    className={getItemClasses(selectedCategory === "all")}
                >
                    <span>All Products</span>
                    {selectedCategory === "all" && <Check className="h-4 w-4" />}
                </DropdownMenuItem>

                {categories.map((category) => {
                    const isActive = selectedCategory === category.slug;

                    return (
                        <DropdownMenuItem
                            key={category.slug}
                            onClick={() => onCategoryChange(category.slug)}
                            className={getItemClasses(isActive)}
                        >
                            <span>{category.name}</span>
                            {isActive && <Check className="h-4 w-4" />}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CategoryFilter;