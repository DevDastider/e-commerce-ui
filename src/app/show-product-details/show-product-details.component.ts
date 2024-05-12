import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { map } from 'rxjs';
import { ImageProcessingService } from '../_services/image-processing.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit{

  constructor(private productService: ProductService, private imagesDialog: MatDialog, private imageProcessingService: ImageProcessingService){}
  
  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price', 'Images', 'Edit', 'Delete']; 

  ngOnInit(): void {
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
    .subscribe(
      (resp: Product[])  => {
        console.log(resp);
        this.productDetails = resp;
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
}
