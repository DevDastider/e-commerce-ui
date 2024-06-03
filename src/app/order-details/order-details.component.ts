import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/my-orders.model';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {

  constructor(private productService: ProductService){}
  
  ngOnInit(): void {
    this.getAllOrderDetails(this.status);
  }

  allOrderDetails: MyOrderDetails[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'Ordered by', 'Address', 'Contact No.', 'Status', 'Action'];
  status: string = 'ALL';

  public getAllOrderDetails(status: string){
    this.status = status;
    this.productService.getAllOrderDetails(this.status).subscribe({
      next: (resp)=> {console.log(resp); this.allOrderDetails = resp},
      error: (e: HttpErrorResponse) => console.log(e)
    })
  }

  public markDelivered(orderId: string){
    this.productService.markDelivered(orderId).subscribe({
      complete: ()=> this.getAllOrderDetails(this.status),
      error: (e: HttpErrorResponse)=> console.log(e)      
    })
  }
}
