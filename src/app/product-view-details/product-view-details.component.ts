import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css'
})
export class ProductViewDetailsComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService){}

  product: Product = {
    productNumber: undefined,
    productName: '',
    productDescription: '',
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  };

  selectedProductImageIndex = 0;

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  public changeIndex(index: number){
    this.selectedProductImageIndex = index;
  }

  public buyProduct(productNumber: string){
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true, id: productNumber
    }]);
  }

  public addToCart(productNumber: string){
    this.productService.addToCart(productNumber).subscribe({
      complete: ()=> console.log('Added to cart'),
      error: (e: HttpErrorResponse)=> console.log(e)
    });
  }
}
