"use client"

import Image from 'next/image'
import Link from 'next/link'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu'
import { Search, ShoppingCart } from 'lucide-react';
import { Input } from './ui/input';
import React from 'react';
import { Button } from './ui/button';

const categories = [
    { title: "Electronics", href: "/categories/electronics", description: "Gadgets, laptops, and more." },
    { title: "Clothing", href: "/categories/clothing", description: "Trendy outfits for everyone." },
    { title: "Home & Garden", href: "/categories/home", description: "Decor and outdoor essentials." },
];

function Navbar() {
    const [search, setSearch] = React.useState("");
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("search ", search)
    }
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur ">
            <div className="md:px-[8%] mx-auto flex h-16 items-center px-4 justify-between gap-4">
                <div className="hidden lg:flex items-center space-x-4 gap-4">

                    <Link href="/" className='flex items-center space-x-2 mr-4'>
                        <Image src="/logo.png" alt="logo" width="82" height="82" />
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/products" >
                                    <NavigationMenuLink className="font-normal">
                                        All Products
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className='font-normal'>Categories</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 ">
                                        {categories.map((category) => (
                                            <li key={category.title}>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href={category.href}
                                                        className="block select-none space-y-1 rounded-md p-3   transition-colors "
                                                    >
                                                        <div className="text-sm font-medium">{category.title}</div>
                                                        <p className="line-clamp-2 text-sm  text-muted-foreground">
                                                            {category.description}
                                                        </p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className='flex gap-4 '>
                    <form onSubmit={handleSearch} className="relative flex-1 max-w-lg ml-auto hidden md:flex  w-[300px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-9 bg-muted/50 "
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                    <div className='flex item-center gap-2'>
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                        </Button>

                        <div className="hidden sm:block border-l h-6 mx-2" />

                        <Button variant="default" className='' size="sm" asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Navbar