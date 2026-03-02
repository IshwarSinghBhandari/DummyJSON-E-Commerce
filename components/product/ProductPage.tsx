"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDown, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Product, DataType } from '@/app/types/product';
import { Category } from '@/app/types/category';
import ProductCard from '@/components/common/ProductCard';
import { LIMIT } from '@/app/util/constant';
import { ROUTE } from '@/app/util/pageRoutes';
import ProductPagination from './ProductPagination';
import ProductHeader from './ProductHeader';
import ProductSkeleton from '@/components/common/ProductSkeleton';

function ProductPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debounceSearch, setDebounceSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);
    const [sortBy, setSortBy] = useState('');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const fetchCategories = async () => {
        try {
            const response = await fetch(ROUTE.API.CATEGORIES);
            if (response.ok) {
                const data = await response.json();
                const normalized = data.map((cat: any) =>
                    typeof cat === 'string'
                        ? { slug: cat, name: cat.replace('-', ' '), url: '' }
                        : cat
                );
                setCategories(normalized);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                limit: LIMIT.toString(),
                skip: skip.toString(),
            });

            if (debounceSearch) params.append('searchData', debounceSearch);
            if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
            if (sortBy) {
                params.append('sortBy', sortBy);
                params.append('order', order);
            }
            const response = await fetch(`${ROUTE.API.PRODUCTS}?${params.toString()}`);
            if (response.ok) {
                const data: DataType = await response.json();
                setProducts(data.products);
                setTotal(data.total);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    }, [debounceSearch, selectedCategory, skip, sortBy, order]);

    useEffect(() => {
        fetchCategories();
    }, []);

// debounce when user search something ------------
    useEffect(() => {
        const debounceTimer = setTimeout(() => setDebounceSearch(search), 500);
        return () => clearTimeout(debounceTimer);
    }, [search]);

    useEffect(() => {
        if (search !== debounceSearch) return;
        fetchProducts();
    }, [fetchProducts, search, debounceSearch]);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setSelectedCategory('all');
        setSkip(0);
    };
    const onCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSkip(0);
    };
    const onPageChange = (newSkip: number) => {
        setSkip(newSkip);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onSortChange = (newSortBy: string, newOrder: 'asc' | 'desc') => {
        setSortBy(newSortBy);
        setOrder(newOrder);
        setSkip(0);
    };


    return (
        <div className="min-h-screen">
            <div className="mx-auto  py-12  space-y-12 animate-in fade-in duration-1000">
                {/* header for filter search and other ----------------- */}
                <ProductHeader
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={onCategoryChange}
                    search={search}
                    onSearchChange={onSearchChange}
                    sortBy={sortBy}
                    order={order}
                    onSortChange={onSortChange}
                />

                <div className="relative">

                    {/* during loading show skeleton----------------- */}
                    {loading ? (
                        <ProductSkeleton />
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {/* product cards-------- */}
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} onClick={() => router.push(`/${product.id}`)} />
                            ))}
                        </div>
                    ) : (

                        // if not product then show this ----------------------------------
                        <div className="flex flex-col items-center justify-center py-24 px-6 text-center border rounded-[8px]">

                            <Package className="h-12 w-12 text-gray-500 mb-4" />
                            <h2 className="text-xl font-semibold mb-2">
                                No products found
                            </h2>

                            <p className="text-gray-500 max-w-md ">
                                Clear filters to view all products
                            </p>
                            <ArrowDown className="h-6 w-6 my-4" />

                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearch("");
                                    setSelectedCategory("all");
                                    setSkip(0);
                                    setSortBy("");
                                    setOrder("asc");
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
                {/* pagination part ------------------- */}
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