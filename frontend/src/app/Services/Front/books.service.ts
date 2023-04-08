import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StorageService} from "../storage.service";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

    httpOptions = {
        params: {},
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageService.getUser().token}`
        })
    };

    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    index(params: any): Observable<any> {
        this.httpOptions.params = {page_length: params.perPage, search: params.searchValue, category: params.category}
        return this.http.get(params.url,
            this.httpOptions
        );
    }

    edit(id: Number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `books/${id}/details`,
            this.httpOptions
        );
    }

    addToWishList(id: Number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.post(
            API_URL + `books/${id}/wishlist`,
            {},
            this.httpOptions
        );
    }

    initWishList(id: Number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `books/${id}/wishlist`,
            this.httpOptions
        );
    }

    getCategories(): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `book-categories`,
            this.httpOptions
        );
    }




}
