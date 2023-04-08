import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StorageService} from "../storage.service";

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

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
        this.httpOptions.params = {page_length: params.perPage, search: params.searchValue}
        return this.http.get(params.url,
            this.httpOptions
        );
    }

    create(): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + 'admin/author/create',
            this.httpOptions
        );
    }



    edit(id: Number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `admin/author/${id}/edit`,
            this.httpOptions
        );
    }

    show(id: Number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `admin/author/${id}`,
            this.httpOptions
        );
    }

    store(data: any): Observable<any> {
        this.httpOptions.params = {}
        return this.http.post(
            API_URL + 'admin/author',
            {
                name: data.name,
                birthday: data.birthday
            },
            this.httpOptions
        );
    }

    update(data: any, id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.patch(
            API_URL + `admin/author/${id}`,
            {
                name: data.name,
                birthday: data.birthday
            },
            this.httpOptions
        );
    }

    destroy(id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.delete(
            API_URL + `admin/author/${id}`,
            this.httpOptions
        );
    }
}
