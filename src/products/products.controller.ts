import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductService: ProductsService) {}

  @Post()
  addProducts(
    // @Body() prodTitle:string, @Body() prodDes:string, @Body() prodPrice:string
    @Body() completeBody: { title: string; description: string; price: number },
  ) {
    const generatedID = this.ProductService.insertProduct(
      completeBody.title,
      completeBody.description,
      completeBody.price,
    );
    return { id: generatedID };
  }

  @Get()
  getProducts() {
    return this.ProductService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    console.log('in controller' + id);
    return this.ProductService.getSingleProduct(id);
  }
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.ProductService.updateProduct(id, prodTitle, prodDesc, prodPrice)
    return null;
  }


  @Delete(':id')
  deleteProduct(@Param('id') id: string){
this.ProductService.deleteProduct(id)
return null
  }
}
