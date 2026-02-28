"use client"
import React from 'react'
import Image from 'next/image'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

function MainBanner({ data }: { data: any }) {
    console.log("data", data)
    return (
        <div className="w-full mx-auto mt-6">

            <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
                {data.map((data: any) => (
                    <Card className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all">

                        <div className="relative h-36 sm:h-48 md:h-50 w-full">
                            <Image
                                src={data.images[0]}
                                alt={data.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">
                                {data.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                                {data.description}
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