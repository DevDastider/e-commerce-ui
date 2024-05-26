import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from './product.service';
import { map, of } from 'rxjs';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolveService implements Resolve<Product[]>{

  constructor(private productService: ProductService, private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Product[]> {
    const id = route.paramMap.get("id");
    const flag = route.paramMap.get("isSingleProductCheckout");
    let isSingleProductCheckout:boolean = false;
    let productNumber: string;
    if(flag==='true'){
      isSingleProductCheckout = true;
      console.log('isSingleProductCheckout= '+isSingleProductCheckout);
    }
    if(id){
      productNumber = id;
      return this.productService.getProductDetails(isSingleProductCheckout, productNumber)
        .pipe(map(
          (x: Product[], i) => x.map(
            (product: Product) => {
              product.productImages = this.imageProcessingService.convertByteToImages(product.productImages)
              return product;
            }
          )
        ));
    }
    return of([{
      productNumber: null,
      productName: "Not found",
      productDescription: "Product not found in Inventory",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: []
    }]);
  }
}
