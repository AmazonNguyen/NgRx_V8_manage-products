import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders,HttpParams } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service'
import * as models from '../../models/product';

@Injectable({
  providedIn: 'root'
})


export class ProductService extends BaseService {

  list(shop_id:number, query?:any): Observable<{ rows: models.Product[], count: number }> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 457b62a3521d310f0108935376f57a07dc889966'
      }),
      params: new HttpParams(query)
    };
    return this.get<any>(`/shop-products?shop_id=${shop_id}`, httpOptions)
  }

  destroy(shopProductId: number): Observable<models.Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 457b62a3521d310f0108935376f57a07dc889966'
      })
    };
    return this.delete<any>(`/${shopProductId}`,httpOptions);
  }
}