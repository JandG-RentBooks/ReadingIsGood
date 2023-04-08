import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StorageService} from "../storage.service";

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class BookService {

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
            API_URL + 'admin/book/create',
            this.httpOptions
        );
    }


    edit(id: Number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `admin/book/${id}/edit`,
            this.httpOptions
        );
    }

    show(id: Number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `admin/book/${id}`,
            this.httpOptions
        );
    }

    store(data: any): Observable<any> {
        this.httpOptions.params = {}
        console.log(data)
        return this.http.post(
            API_URL + 'admin/book',
            {
                title: data.title,
                description: data.description,
                published: data.published,
                number_of_page: data.number_of_page,
                isbn_code: data.isbn_code,
                in_stock: data.in_stock,
                available: data.in_stock, //Új tétel felvitelekor megegyezik az in_stock értékével
                publisher_id: data.publisher_id,
                language_id: data.language_id,
                cover_type_id: data.cover_type_id,
                file_id: data.file_id,
                authors: data.authors,
                categories: data.categories,
                labels: data.labels,
                is_new: data.is_new,
            },
            this.httpOptions
        );
    }

    update(data: any, id: number): Observable<any> {
        this.httpOptions.params = {}
        console.log(data)
        return this.http.patch(
            API_URL + `admin/book/${id}`,
            {
                title: data.title,
                description: data.description,
                published: data.published,
                number_of_page: data.number_of_page,
                isbn_code: data.isbn_code,
                in_stock: data.in_stock,
                publisher_id: data.publisher_id,
                language_id: data.language_id,
                cover_type_id: data.cover_type_id,
                file_id: data.file_id,
                authors: data.authors,
                categories: data.categories,
                mainCategory: data.mainCategory,
                labels: data.labels,
                is_new: data.is_new,
            },
            this.httpOptions
        );
    }

    destroy(id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.delete(
            API_URL + `admin/book/${id}`,
            this.httpOptions
        );
    }

    getImages(v: any): Observable<any> {
        this.httpOptions.params = {search: v}
        return this.http.get(
            API_URL + 'admin/book/image-storage',
            this.httpOptions
        );
    }
}
