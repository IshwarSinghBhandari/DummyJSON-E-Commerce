"use client";

import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/app/types/product';


const ProductCard = ({ product, onClick, onCartClick }: ProductCard) => {
    return (

        <Card
            className="flex flex-col cursor-pointer py-0 gap-2 h-full rounded-[8px] border overflow-hidden hover:shadow-md transition"
            onClick={onClick}
        >
            <div className="relative h-50">
                <Image
                    src={product.thumbnail || product.images[0]}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 25vw"
                />
            </div>

            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold line-clamp-1">
                    {product.title}
                </h3>

                <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating || 0)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-600"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600">
                        {product.rating || 0}
                    </span>
                </div>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4">
                    <div>
                        {product.discountPercentage > 0 && (
                            <span className="block text-sm text-gray-600 line-through">
                                $
                                {(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                            </span>
                        )}
                        <span className="text-xl font-bold text-primary">
                            ${product.price}
                        </span>
                    </div>

                    <Button size="icon" className="cursor-pointer" onClick={onCartClick} variant="default">
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;
