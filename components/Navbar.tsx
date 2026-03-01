"use client"

import Image from 'next/image'
import Link from 'next/link'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu'
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import logo from "@/public/logo.png"
import { ROUTE } from '@/app/util/pageRoutes';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { LogOut, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useLogout } from '@/app/util/service/logoutAPI';

const categories = [
    { title: "Electronics", href: "/categories/electronics", description: "Gadgets, laptops, and more." },
    { title: "Clothing", href: "/categories/clothing", description: "Trendy outfits for everyone." },
    { title: "Home & Garden", href: "/categories/home", description: "Decor and outdoor essentials." },
];

function Navbar() {
    const logout = useLogout();
    const user = useSelector((state: RootState) => state.user);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur ">
            <div className="md:px-[8%] mx-auto flex h-16 items-center px-4 justify-between gap-4">
                <div className="hidden lg:flex items-center space-x-4 gap-4">

                    <Link href={ROUTE.HOME} className='flex items-center space-x-2 mr-4'>
                        <Image src={logo} alt="logo" width="82" height="82" />
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            {/* <NavigationMenuItem>
                                <Link href={ROUTE.PRODUCTS} >
                                    <NavigationMenuLink className="font-normal">
                                        All Products
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem> */}

                            <NavigationMenuItem >
                                <NavigationMenuTrigger className='font-normal'>Categories</NavigationMenuTrigger>
                                <NavigationMenuContent >
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
                    {/* <form onSubmit={handleSearch} className="relative flex-1 max-w-lg ml-auto hidden md:flex  w-[300px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-9 bg-muted/50 "
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form> */}

                    <div className='flex item-center gap-2'>
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                        </Button>

                        <div className="hidden sm:block border-l h-6 mx-2" />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.image} alt={user.firstName} />
                                        <AvatarFallback>{user.firstName?.charAt(0) || user.username?.charAt(0) || 'P'}</AvatarFallback>

                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Navbar