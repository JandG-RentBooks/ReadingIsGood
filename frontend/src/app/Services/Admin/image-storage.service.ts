import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StorageService} from "../storage.service";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {

    httpOptions = {
        params: {},
        headers: new HttpHeaders({
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

    store(formData: any): Observable<any> {
        return this.http.post(`${API_URL}admin/image-storage`, formData, {
            //reportProgress: true,
            //observe: 'events',
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.storageService.getUser().token}`
            })
        });
    }

    destroy(id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.delete(
            API_URL + `admin/image-storage/${id}`,
            this.httpOptions
        );
    }
}
