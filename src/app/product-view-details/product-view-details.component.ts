import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css'
})
export class ProductViewDetailsComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute){}

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
    this.product = this.activatedRoute.snapshot.data['poduct'];
    console.log(this.product);
  }

  public changeIndex(index: number){
    this.selectedProductImageIndex = index;
  }
}