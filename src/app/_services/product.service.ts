import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  HOST_SERVER_PATH = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData){
    return this.httpClient.post<Product>(this.HOST_SERVER_PATH + "/addProduct", product);
  }

  public getAllProducts(){
    return this.httpClient.get<Product[]>(this.HOST_SERVER_PATH + "/getAllProducts");
  }

  public deleteProduct(productNumber: Number){
    return this.httpClient.delete(this.HOST_SERVER_PATH + "/deleteProductDetails/" + productNumber);
  }

  public getProductById(productNumber: string){
    return this.httpClient.get<Product>(this.HOST_SERVER_PATH + "/getProductDetailsById/" + productNumber);
  }
}