
export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
    discountPercentage: number;
    stock: number;
}

export interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;
}
