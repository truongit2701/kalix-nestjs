import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  HttpException,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseResponse } from 'src/repsonse/exceptions/base-reponse';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async create(@Body() createProductDto: CreateProductDto, @Res() res: any) {
    const newP = await this.productService.createProduct(createProductDto);
    return res.status(HttpStatus.OK).send(new BaseResponse({}));
  }

  @Get()
  async getList(@Res() res: any) {
    const products = await this.productService.findAll();
    return res.status(HttpStatus.OK).send(new BaseResponse({}));
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Res() res: any) {
    const product = await this.productService.findOne(+id);
    return res.status(HttpStatus.OK).send(
      new BaseResponse({
        status: 200,
        message: 'success',
        data: product,
      }),
    );
  }

  @Post('assign-size')
  async assignSize(@Query() query: any, @Res() res: any, @Body() body: any) {
    await this.productService.findOne(+query.product_id);
    await this.productService.assignSize(+query.product_id, body);
    return res.status(HttpStatus.OK).send(new BaseResponse({}));
  }

  @Post('assign-material')
  async assignMaterial(
    @Query() query: any,
    @Res() res: any,
    @Body() body: any,
  ) {
    await this.productService.findOne(+query.product_id);
    await this.productService.assignMaterial(+query.product_id, body);
    return res.status(HttpStatus.OK).send(new BaseResponse({}));
  }
}
