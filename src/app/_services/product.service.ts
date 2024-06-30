import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/my-orders.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  HOST_SERVER_PATH = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData){
    return this.httpClient.post<Product>(this.HOST_SERVER_PATH + "addProduct", product);
  }

  public getAllProducts(pageNumber: number, searchKey : string){
    return this.httpClient.get<Product[]>(this.HOST_SERVER_PATH + "getAllProducts?pageNumber="+ pageNumber+ "&searchKey="+searchKey);
  }

  public deleteProduct(productNumber: Number){
    return this.httpClient.delete(this.HOST_SERVER_PATH + "deleteProductDetails/" + productNumber);
  }

  public getProductById(productNumber: string){
    return this.httpClient.get<Product>(this.HOST_SERVER_PATH + "getProductDetailsById/" + productNumber);
  }

  public getProductDetails(isSingleProductCheckout:boolean, productNumber:string){
    return this.httpClient.get<Product[]>(this.HOST_SERVER_PATH + 'getProductDetails/' + isSingleProductCheckout + "/" + productNumber);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout: boolean){
    return this.httpClient.post(this.HOST_SERVER_PATH + "placeOrder/" + isCartCheckout, orderDetails);
  }

  public addToCart(productNumber: string){
    return this.httpClient.get(this.HOST_SERVER_PATH + "addToCart/" + productNumber);
  }

  public getCartDetails(){
    return this.httpClient.get(this.HOST_SERVER_PATH + "getCartDetails");
  }

  public deleteCartItem(cartId: string){
    return this.httpClient.delete(this.HOST_SERVER_PATH + 'deleteCartItem/' + cartId);
  }

  public getOrderDetails(): Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>(this.HOST_SERVER_PATH + 'getOrderDetails');
  }

  public getAllOrderDetails(status: string): Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>(this.HOST_SERVER_PATH + 'getAllOrderDetails/' + status);
  }

  public markDelivered(orderId: string){
    return this.httpClient.get(this.HOST_SERVER_PATH + 'orderDelivered/' + orderId);
  }

  public paymentTransaction(amount: number){
    return this.httpClient.get(this.HOST_SERVER_PATH + 'createTransaction/' + amount);
  }
}
