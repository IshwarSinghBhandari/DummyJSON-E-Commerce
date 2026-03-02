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

export interface ProductReview {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface ProductDetail extends Product {
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: ProductReview[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    tags: string[];
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
    onCartClick?: () => void;
}

export interface ProductPaginationTypes {
    total: number;
    limit: number;
    skip: number;
    onPageChange: (newSkip: number) => void;
}

export interface ProductHeaderTypes {
    categories: any[];
    selectedCategory: string;
    onCategoryChange: (slug: string) => void;
    search: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sortBy: string;
    order: "asc" | "desc";
    onSortChange: (sortBy: string, order: "asc" | "desc") => void;
}


export interface ProductSkeletonTypes {
    count?: number;
    className?: string;
}


export interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

export interface ImageGallerytype {
    images: string[];
    title: string;
}

export type ProductDetailPageProps = {
    product?: ProductDetail | null;
    error?: string | null;
};