interface Product {
    id: number;
    name: string;
    alcoholContent: number;
    priceInCents: number;
}

interface Page {
    page: number;
    products: Product[];
}

export { Page, Product };