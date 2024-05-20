import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { map } from 'rxjs';
import { ImageProcessingService } from '../_services/image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit{

  constructor(
    private productService: ProductService,
    private imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ){}
  
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discounted Price', 'Product Actual Price', 'More']; 
  pageNumber: number = 0;
  showTable: boolean = false;
  showLoadButton: boolean = false;

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(){
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber)
    .pipe(
      map((x:Product[],i)=> x.map((product: Product) => {
        product.productImages = this.imageProcessingService.convertByteToImages(product.productImages);
        return product;
      }))
    )
    .subscribe(
      (resp: Product[])  => {
        console.log(resp);
        resp.forEach(product=> this.productDetails.push(product));
        this.showTable = true;
        if (resp.length == 10){
          this.showLoadButton = true;
        } else{
          this.showLoadButton = false;
        }
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

  public deleteProduct(productNumber: number){
    this.productService.deleteProduct(productNumber).subscribe({
      complete: ()=> {
        console.info('complete');
        this.getAllProducts();
      },
      error: (e:HttpErrorResponse)=> console.log(e)
    });
  }

  public showImages(product: Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, 
    {
      data: {images: product.productImages},
      height: '500px',
      width: '800px'
    });
  }

  public editProductDetails(productNumber: number){
    this.router.navigate(['/addNewProduct', {productNumber: productNumber}]);
  }

  public loadMoreProduct(){
    this.pageNumber += 1;
    this.getAllProducts();
  }
}
