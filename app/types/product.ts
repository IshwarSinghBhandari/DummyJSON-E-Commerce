export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface DataType {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface ProductCard {
    product: Product;
    onClick?: () => void;
}

export interface ProductPagination {
    total: number;
    limit: number;
    skip: number;
    onPageChange: (newSkip: number) => void;
}

export interface ProductHeader {
    categories: any[];
    selectedCategory: string;
    onCategoryChange: (slug: string) => void;
    search: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sortBy: string;
    order: "asc" | "desc";
    onSortChange: (sortBy: string, order: "asc" | "desc") => void;
}


export interface ProductSkeleton {
    count?: number;
    className?: string;
}
