import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpObserve } from '@angular/common/http/src/client';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private baseUrl = 'http://sandbox.icheck.com.vn:4680/api/v1';

  constructor(protected http: HttpClient) { }

  get<T>(endpoint: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  } = {}): Observable<T> {
    return this.http.get<T>(this.buildUrl(endpoint), options);
  }

  post<T>(endpoint: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  } = {}): Observable<T> {
    return this.http.post<T>(this.buildUrl(endpoint), body, options);
  }

  patch<T>(endpoint: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  } = {}): Observable<T> {
    return this.http.patch<T>(this.buildUrl(endpoint), body, options);
  }

  put<T>(endpoint: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  } = {}): Observable<T> {
    return this.http.put<T>(this.buildUrl(endpoint), body, options);
  }
  delete<T>(endpoint: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
  } = {}): Observable<T> {
    return this.http.delete<T>(this.buildUrl(endpoint), options);
  }

  protected buildUrl(url: string): string {
    return `${this.baseUrl}/${url.replace(/^\/+/g, '')}`;
  }

}
