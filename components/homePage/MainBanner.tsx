"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { ROUTE } from '@/app/util/pageRoutes'

import { Skeleton } from '../ui/skeleton'
import { Product } from '@/app/types/home'

function MainBanner() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log(
                    "api call"
                )
                const res = await fetch(ROUTE.API.PRODUCTS,)
                const data = await res.json()
                setProducts(data.products || [])
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return (
            <div className="w-full mx-auto mt-6">
                <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <Card key={i} className="mx-auto w-full max-w-sm overflow-hidden rounded-[10px] shadow-sm">
                            <Skeleton className="h-36 sm:h-48 md:h-50 w-full" />
                            <CardHeader className="space-y-2">
                                <Skeleton className="h-4 w-[70%]" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-[50%]" />

                            </CardHeader>
                            <CardFooter>
                                <Skeleton className="h-[40px] w-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>
    }

    return (
        <div className="w-full mx-auto mt-6">

            <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
                {products.map((item: Product) => (
                    <Card key={item.id} className="mx-auto w-full max-w-sm overflow-hidden rounded-[10px] shadow-sm hover:shadow-lg transition-all">

                        <div className="relative h-36 sm:h-48 md:h-50 w-full">
                            <Image
                                src={item.images[0]}
                                alt={item.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">
                                {item.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                                {item.description}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className="w-full">
                                View Product
                            </Button>
                        </CardFooter>

                    </Card>
                ))}
            </div>
        </div>
    )
};

export default MainBanner;      