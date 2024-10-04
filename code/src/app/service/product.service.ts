import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = 'https://projectapi.gerasim.in/api/';

  constructor(private http: HttpClient) { }

  getAllProducts() :Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}Products?pageNumber=1&pageSize=50`)
  }

  getSingleProduct(id: number) :Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}Products/getSingleProduct?id=${id}`)
  }
 
  saveProdcut(obj:IProduct) :Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}Products`, obj)
  }

  updateProdcut(obj:IProduct) :Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiUrl}Products`, obj)
  }

  deletProdcut(id:number) :Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.apiUrl}Products/deleteProduct?id=${id}`)
  }
}
