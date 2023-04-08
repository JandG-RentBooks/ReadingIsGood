import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StorageService} from "../storage.service";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SubscriptionTypeService {
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
        this.httpOptions.params = {page_length: params.perPage, search: params.searchValue,}
        return this.http.get(params.url,
            this.httpOptions
        );
    }

    create(): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + 'admin/subscription-type/create',
            this.httpOptions
        );
    }



    edit(id: Number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `admin/subscription-type/${id}/edit`,
            this.httpOptions
        );
    }

    show(id: Number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `admin/subscription-type/${id}`,
            this.httpOptions
        );
    }

    store(data: any): Observable<any> {
        this.httpOptions.params = {}
        console.log(data)
        return this.http.post(
            API_URL + 'admin/subscription-type',
            {
                book_number: data.book_number,
                description: data.description,
                price: data.price,
            },
            this.httpOptions
        );
    }

    update(data: any, id: number): Observable<any> {
        this.httpOptions.params = {}
        console.log(data)
        return this.http.patch(
            API_URL + `admin/subscription-type/${id}`,
            {
                book_number: data.book_number,
                description: data.description,
                price: data.price,
            },
            this.httpOptions
        );
    }

    destroy(id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.delete(
            API_URL + `admin/subscription-type/${id}`,
            this.httpOptions
        );
    }
}
