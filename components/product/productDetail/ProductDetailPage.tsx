"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ShoppingCart,
    Package,
    Truck,
    RotateCcw,
    ShieldCheck,
    Tag,
    AlertCircle,
    Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {  ProductDetailPageProps } from "@/app/types/product";
import InfoRow from "./InfoRow";
import ReviewCard from "./ReviewCard";
import DetailSkeleton from "./DetailSkeleton";
import ImageGallery from "./ImageGallery";
import { useCart } from "@/app/util/useCart";


export default function ProductDetailPage({ product, error }: ProductDetailPageProps) {
    const router = useRouter();
    const cart = useCart();

    // during loading show skeleton-----------------
    if (product === undefined) return <DetailSkeleton />;

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 py-24">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <h2 className="text-xl font-semibold">Product not found</h2>
                <p className="text-gray-600">{error ?? "Something went wrong"}</p>
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go Back
                </Button>
            </div>
        );
    }

    const originalPrice = (product.price * (1 + product.discountPercentage / 100)).toFixed(2);
    const allImages = product.images?.length ? product.images : [product.thumbnail];

    const stockStatus =
        product.stock === 0
            ? { label: "Out of Stock", color: "bg-red-100 text-red-700 border-red-200" }
            : { label: "In Stock", color: "bg-green-100 text-green-700 border-green-200" };

    return (
        <div className="min-h-screen">
            <div className="mx-auto py-12 space-y-12 animate-in fade-in duration-500">

                <Button
                    variant="ghost"
                    className="gap-2 -ml-2 text-gray-600 hover:text-foreground"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Products
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* show image crousal and bottom image to click----------------- */}
                    <ImageGallery images={allImages} title={product.title} />

                    {/* item details part----------------------- */}
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2 items-center">
                            <Badge variant="secondary" className="capitalize text-xs">
                                {product.category}
                            </Badge>
                            {product.tags?.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs gap-1">
                                    <Tag className="h-3 w-3" />
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight leading-tight">{product.title}</h1>
                            {product.brand && (
                                <p className="text-gray-600 mt-1 text-sm">by <span className="font-medium">{product.brand}</span></p>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(product.rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-600"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="font-semibold">{product.rating}</span>
                            <span className="text-gray-600 text-sm">
                                ({product.reviews?.length ?? 0} reviews)
                            </span>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
                            {product.discountPercentage > 0 && (
                                <>
                                    <span className="text-gray-600 line-through text-lg">${originalPrice}</span>
                                    <Badge className="bg-green-100 text-green-700 border-green-200 border font-semibold">
                                        {Math.round(product.discountPercentage)}% OFF
                                    </Badge>
                                </>
                            )}
                        </div>

                        <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${stockStatus.color}`}>
                            {stockStatus.label}
                        </span>

                        <p className="text-gray-600 leading-relaxed">{product.description}</p>

                        {/* add to cart button--------- */}
                        <div className="flex gap-3 pt-2">
                            <Button
                                size="lg"
                                className="gap-2 flex-1 sm:flex-none"
                                disabled={product.stock === 0}
                                onClick={() => cart.add(product)}
                            >

                                <ShoppingCart className="h-5 w-5" />
                                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                            </Button>

                            {/* on click it seds to back ------------------- previous page------ */}
                            <Button size="lg" variant="outline" onClick={() => router.back()} className="flex-1 sm:flex-none">
                                Continue Shopping
                            </Button>
                        </div>

                        <Separator />

                        {/*  info part */}
                        <div className="divide-y divide-border">
                            <InfoRow
                                icon={<Truck className="h-4 w-4" />}
                                label="Shipping"
                                value={product.shippingInformation ?? " -"}
                            />
                            <InfoRow
                                icon={<RotateCcw className="h-4 w-4" />}
                                label="Return Policy"
                                value={product.returnPolicy ?? "-"}
                            />
                            <InfoRow
                                icon={<ShieldCheck className="h-4 w-4" />}
                                label="Warranty"
                                value={product.warrantyInformation ?? "-"}
                            />
                            <InfoRow
                                icon={<Package className="h-4 w-4" />}
                                label="SKU"
                                value={product.sku ?? "-"}
                            />
                        </div>
                    </div>
                </div>

                {/* reviews part from users-------- */}
                {product.reviews && product.reviews.length > 0 && (
                    <div className="space-y-6">
                        <Separator />
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Customer Reviews</h2>
                            <p className="text-gray-600 text-sm mt-1">
                                {product.reviews.length} review{product.reviews.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {product.reviews.map((review, i) => (
                                <ReviewCard key={i} review={review} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
