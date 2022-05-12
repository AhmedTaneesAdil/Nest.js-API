import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desciption: string, price: number) {
    const prodId = Math.floor(Math.random() * 100).toString();
    const newProduct = new Product(prodId, title, desciption, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(prodId: string) {
    console.log('in service' + prodId);



    // return this.products.find(prod=> {

    //   if( prod.id === prodId)
    //   {
    //     return prod
    //   }
    //   else{
    //     throw new NotFoundException('Product not found :-D');
    //   }
      
    // })
    const foundProduct = this.findProduct(prodId)[0]
    return foundProduct;

    // const product = this.products.find(prod => 
    //   // console.log("testing product",prod, prodId);
    //   prod.id === prodId
    // );
    
    // console.log(product);
    
    
    // if (!product) {
    //   throw new NotFoundException('Product not found');
    // }
    // return { ...product };
  }



  updateProduct(prodId:string, title:string, prodDesc:string, price:number){
    const [product, index] = this.findProduct(prodId)
    const updatedProduct = {...product}
    if (title)
    {
      updatedProduct.title=title
    }
    if (prodDesc)
    {
      updatedProduct.desciption=prodDesc
    }
    if (price)
    {
      updatedProduct.price=price
    }

    this.products[index]= updatedProduct;

    

  }


  deleteProduct(id:string){
    const [product, index] = this.findProduct(id)
    this.products.splice(index, 1)
  }


  private findProduct(prodId:string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === prodId);
    const product = this.products[productIndex]
    console.log(product);
    
    
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return [product, productIndex];
  }
}
