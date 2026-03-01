"use client"
import { useState, useEffect } from 'react'
import { ROUTE } from '@/app/util/pageRoutes'
import { Product } from '@/app/types/product'
import ProductCard from '../common/ProductCard'
import ProductSkeleton from '../common/ProductSkeleton'

function MainBanner() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {

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
                <ProductSkeleton count={8} className="grid-cols-2 lg:grid-cols-4" />
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
                    <>
                        <ProductCard key={item.id} product={item} />
                    </>
                ))}
            </div>
        </div>
    )
};

export default MainBanner;      