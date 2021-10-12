import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  findOne(id): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  update(id: number, updateProductDto: UpdateProductDto): any {
    return this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  remove(id: number): any {
    return this.productModel.findByIdAndDelete(id);
  }
}
