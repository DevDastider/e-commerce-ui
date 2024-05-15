import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../_services/image-processing.service';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  productDetails: Product[] = [];

  constructor(
    private productService: ProductService, 
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    console.log('inside ngoninit');
    
    this.getAllProducts();
  }

  public getAllProducts(){
    this.productService.getAllProducts()
    .pipe(
      map((x:Product[],i)=> x.map((product: Product) => {
        product.productImages = this.imageProcessingService.convertByteToImages(product.productImages);
        return product;
      }))
    )
    .subscribe({
      next: (resp: Product[])=>{
        console.log(resp);
        this.productDetails = resp;
      },
      error: (e: HttpErrorResponse)=> console.log(e)
      
    }
    )
  }

  public showProductDetails(productNumber: number){
    this.router.navigate(['/productViewDetails', {productNumber: productNumber}])
  }
}
