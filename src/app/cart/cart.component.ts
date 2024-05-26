import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  constructor(private productService: ProductService, private router: Router){}

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

  public checkoutCart(){
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true, id: '0'
    }]);
  }
}
