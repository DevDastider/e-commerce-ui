import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MyOrderDetails } from '../_model/my-orders.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{

  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.getMyOrders();
  }

  myOrderDetails: MyOrderDetails[] = [];
  displayedColumns: string[] = ['Name', 'Address', 'Contact', 'Amount', 'Status'];

  public getMyOrders(){
    this.productService.getOrderDetails().subscribe({
      next: (resp: MyOrderDetails[])=> {console.log(resp);
       this.myOrderDetails = resp},
      error: (e: HttpErrorResponse)=> console.log(e)      
    })
  }
}
