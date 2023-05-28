import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Size } from 'src/size/entities/size.entity';
import { Material } from 'src/material/entities/material.entity';
import { stringToSlug } from 'src/utils/template/util.template';
import { ProductResponse } from './response/product.response';
import { ProductSize } from './entities/product_size.entity';
import { DetailProductResponse } from './response/detail-product.response';
import { ExceptionResponse } from 'src/repsonse/exceptions';
import { ProductMaterial } from './entities/product-material.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Size)
    private readonly sizeRepo: Repository<Size>,
    @InjectRepository(ProductSize)
    private readonly productSizeRepo: Repository<ProductSize>,
    @InjectRepository(Material)
    private readonly materialRepo: Repository<Material>,
    @InjectRepository(ProductMaterial)
    private readonly productMaterialRepo: Repository<ProductMaterial>,
  ) {}

  async createProduct(body: CreateProductDto) {
    const size = await this.sizeRepo.findOne({
      where: {
        name: body.size,
      },
    });

    const newProduct = await this.productRepo
      .create({
        name: body.name,
        info: body.info,
        price: body.price,
        code: stringToSlug(body.name),
        image: body.image,
      })
      .save();

    return newProduct;
  }

  async findAll() {
    const products = await this.productRepo.find();
    return ProductResponse.MaptoList(products);
  }

  async findOne(id: number) {
    const detailProduct = await this.productRepo.findOne({
      where: {
        id,
      },
      relations: {
        product_size: {
          size: true,
        },
        feedback: true,
        product_material: {
          material: true,
        },
      },
    });

    if (!detailProduct)
      throw new ExceptionResponse(HttpStatus.NOT_FOUND, 'product not exits');

    return DetailProductResponse.MaptoList(detailProduct);
  }

  async assignSize(product_id: number, body: any) {
    await Promise.all(
      body.size.map(async (item) => {
        await this.productSizeRepo
          .create({
            product: { id: product_id },
            size: { id: item },
          })
          .save();
      }),
    );

    return true;
  }

  async assignMaterial(product_id: number, body: any) {
    await Promise.all(
      body.material.map(async (item: number) => {
        await this.productMaterialRepo
          .create({
            product: { id: product_id },
            material: { material_id: item },
          })
          .save();
      }),
    );

    return true;
  }
}
