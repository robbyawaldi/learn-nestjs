import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number): string {
        const id = Math.random().toString()
        const newProduct = new Product(id, title, desc, price);
        this.products.push(newProduct)
        return id
    }

    getProducts(): Product[] {
        return [...this.products];
    }

    getProduct(id: string) {
        const product = this.findProduct(id)[0]
        return { ...product }
    }

    updateProduct(id: string, title: string, description: string, price: number) {
        const [product, index] = this.findProduct(id)
        const updatedProduct = {...product}
        if (title) updatedProduct.title = title
        if (description) updatedProduct.description = description
        if (price) updatedProduct.price = price
        this.products[index] = updatedProduct
    }

    deleteProduct(id: string) {
        const [_, index] = this.findProduct(id)
        this.products.splice(index, 1)
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id)
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException('Could not find product');
        }

        return [product, productIndex]
    }
}