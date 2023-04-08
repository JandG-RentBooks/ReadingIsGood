import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StorageService} from "../storage.service";

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class IndexService {

    httpOptions = {
        params: {},
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    httpOptionsAuth = {
        params: {},
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageService.getUser().token}`
        })
    };

    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    getBooks(): Observable<any> {
        return this.http.get(
            API_URL + 'last-rented',
            this.httpOptions
        );
    }

    getTestimonials(): Observable<any> {
        return this.http.get(
            API_URL + 'testimonials',
            this.httpOptions
        );
    }



    getCompany(): Observable<any> {
        return this.http.get(
            API_URL + 'company',
            this.httpOptions
        );
    }

    getReferences(params: any): Observable<any> {
        this.httpOptions.params = {page_length: params.perPage}
        return this.http.get(params.url,
            this.httpOptions
        );
    }

    storeReference(data: any): Observable<any> {
        this.httpOptions.params = {}
        return this.http.post(
            API_URL + `reference`,
            {
                description: data.description,
                rating: data.rating[0]
            },
            this.httpOptionsAuth
        );
    }

    getPageContent(v: string): Observable<any> {
        this.httpOptions.params = {reference: v}
        return this.http.get(
            API_URL + 'page-content',
            this.httpOptions
        );
    }

}
