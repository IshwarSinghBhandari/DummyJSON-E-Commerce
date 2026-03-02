export interface Category {
    slug: string;
    name: string;
    url: string;
}

export interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (slug: string) => void;
}
