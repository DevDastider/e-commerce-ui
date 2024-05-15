import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../_model/product.model';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  constructor(
    private productService: ProductService, 
    private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const productNumber = route.paramMap.get("productNumber");

    if (productNumber) {
      return this.productService.getProductById(productNumber)
              .pipe(
                map(product=> {
                  product.productImages = this.imageProcessingService.convertByteToImages(product.productImages)
                  return product;
                })
              );
    } else {
      return of(this.getDefaultProduct());
    }
  }

  private getDefaultProduct(): Product{
    return {
      productNumber: null,
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: []
    }
  }
}
