import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsRepository {
    private products: Product[] = [];
    private nextId = 1;

    findAll(page = 1, limit = 5){
        const starIndex = (page - 1) * limit;
        const endIndex = starIndex + limit;

        const paginatedItems = this.products.slice(starIndex, endIndex);
        const totalItems = this.products.length;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data : paginatedItems.map(rest => rest),
            totalItems,
            totalPages,
            currentPages: page
        }
    }

    findById(id: number): Product {
        const product = this.products.find(product => product.id === id);
        if(!product) throw new NotFoundException(`Producto con id ${id} no encontrado`);
        return product;
    }

    create(productData: CreateProductDto): Product{
        const newProduct: Product = {
            id: this.nextId++,
            ...productData,
        };
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, productData: UpdateProductDto): Product{
        const index = this.products.findIndex(product => product.id === id);
        if(index === -1) throw new NotFoundException(`Producto con id ${id} no encontrado`);
        this.products[index] = {...this.products[index], ...productData};
        return this.products[index];
    }

    remove(id: number){
        const index = this.products.findIndex(product => product.id === id);
        if(index === -1) throw new NotFoundException(`Producto con id ${id} no encontrado`);
        this.products.splice(index, 1);
        return {mesagge: `Producto con id ${id} eliminado con exito`}
    }
}