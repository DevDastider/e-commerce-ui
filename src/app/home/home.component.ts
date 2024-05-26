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
  
  pageNumber: number = 0;
  productDetails: Product[] = [];
  showLoadButton: boolean = false;

  constructor(
    private productService: ProductService, 
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    console.log('inside ngoninit');
    
    this.getAllProducts();
  }

  public getAllProducts(searchKey: string = ""){
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x:Product[],i)=> x.map((product: Product) => {
        product.productImages = this.imageProcessingService.convertByteToImages(product.productImages);
        return product;
      }))
    )
    .subscribe({
      next: (resp: Product[])=>{
        console.log(resp);
        resp.forEach(product=> this.productDetails.push(product));
        if(resp.length==10){
          this.showLoadButton = true;
        } else{
          this.showLoadButton = false;
        }
        // this.productDetails = resp;
      },
      error: (e: HttpErrorResponse)=> console.log(e)
      
    }
    )
  }

  public showProductDetails(productNumber: number){
    this.router.navigate(['/productViewDetails', {productNumber: productNumber}])
  }

  public loadMoreProduct(){
    this.pageNumber += 1;
    this.getAllProducts();
  }

  public searchByKeyword(searchKeyword: string){
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKeyword);
  }
}
