import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  constructor(private productService: ProductService){}

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price'];
  cartDetails: any[] = [];
  
  ngOnInit(): void {
    this.getCartDetails();
  }

  public getCartDetails(){
    this.productService.getCartDetails().subscribe(
      {
        next: (resp: any)=> {
          console.log(resp);
          this.cartDetails = resp;
        },
        error: (e: HttpErrorResponse)=> console.log(e)
      }
    )
  }
}
