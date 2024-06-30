import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var Razorpay: any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent implements OnInit{
  
  constructor(
    private activatedRoute: ActivatedRoute, 
    private productService: ProductService, 
    private router: Router
  ){}
  
  isSingleProductCheckout: string|null = '';

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        {
          productNumber: x.productNumber,
          productQuantity: 1
        }
      )
    )
  }

  productDetails: Product[] = [];
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId: '',
    orderProductQuantityList: []
  };

  public placeOrder(orderForm: NgForm){
    let isCartCheckout = (this.isSingleProductCheckout) && 
                                      this.isSingleProductCheckout === 'true' ? false : true;
    
    this.productService.placeOrder(this.orderDetails, isCartCheckout).subscribe({
      next: (resp)=> {
        console.log(resp);
        orderForm.reset();
        this.router.navigate(['/orderConfirm']);
      },
      error: (e: HttpErrorResponse)=> console.log(e)
    })
  }

  public getQuantityForProduct(productNumber: number){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQty) => productQty.productNumber === productNumber
    );

    return filteredProduct[0].productQuantity;
  }

  public getTotalForProduct(productNumber: number, productDiscountedPrice: number){
    let productQty = this.getQuantityForProduct(productNumber);

    return productQty * productDiscountedPrice;
  }

  public onQuantityChanged(quantityValue: string, productNumber: number){
    const quantity = parseInt(quantityValue, 10);
    this.orderDetails.orderProductQuantityList.filter(
      (productQty) => productQty.productNumber === productNumber
    )[0].productQuantity = quantity;
  }

  public getGrandTotalBill(){
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQty)=> {
        const productPrice = this.productDetails.filter(product => product.productNumber === productQty.productNumber)[0].productDiscountedPrice;
        grandTotal += productPrice * productQty.productQuantity;
      }
    );
    return grandTotal;
  }

  public makePaymentAndPlaceOrder(orderForm: NgForm){
    let billAmount = this.getGrandTotalBill();
    this.productService.paymentTransaction(billAmount).subscribe({
      next: (response: any)=> this.openTransactionModel(response, orderForm),
      error: (e: HttpErrorResponse)=> console.log(e)
    });
  }
  
  private openTransactionModel(response: any, orderForm: NgForm){
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'ECommerce App',
      description: 'Payment for order',
      image: 'https://cdn.pixabay.com/photo/2017/03/27/21/31/money-2180330_640.jpg',
      handler: (response: any)=> {
        if (response != null && response.razorpay_payment_id != null) {
          this.processResponse(response, orderForm);
        } else {
          alert('Payment failed');
        }
      },
      prefill: {
        name: this.orderDetails.fullName,
        email: 'dastiderdevelops@gmail.com',
        contact: this.orderDetails.contactNumber
      },
      notes: {
        address: 'Online shopping'
      },
      theme: {
        color: '#c692ff'
      }
    }
    
    let razorPay = new Razorpay(options);
    razorPay.open();
  }
  
  private processResponse(response: any, orderForm: NgForm) {
    this.orderDetails.transactionId = response.razorpay_payment_id;
    this.placeOrder(orderForm);
  }
}

