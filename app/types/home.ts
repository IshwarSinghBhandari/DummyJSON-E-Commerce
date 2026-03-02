
export interface Product {
    id: number;
    title: string;
    description: string;
    images: string[];
}

export type User = {
    id?: string | number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    image?: string;
};