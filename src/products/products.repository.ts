import { Injectable } from "@nestjs/common";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsRepository {
    private products: Product[] = [];

    create(product: Product): Product {
        this.products.push(product);
        return product;
    }
    
    findAll(): Product[] {
        return this.products;
    }
    
    findById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }
    
    clear() {
        this.products = [];
    }
}