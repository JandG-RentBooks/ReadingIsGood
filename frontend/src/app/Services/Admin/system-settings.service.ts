import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StorageService} from "../storage.service";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService {

    httpOptions = {
        params: {},
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageService.getUser().token}`
        })
    };

    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    create(): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + 'admin/system-setting',
            this.httpOptions
        );
    }

    update(data: any, id: number): Observable<any> {
        this.httpOptions.params = {}
        console.log(data)
        return this.http.patch(
            API_URL + `admin/system-setting/${id}`,
            {
                company_name: data.company_name,
                company_address: data.company_address,
                company_email: data.company_email,
                company_phone_number: data.company_phone_number,
                company_manager: data.company_manager,
                company_tax_number: data.company_tax_number,
                bank: data.bank,
                bank_account_number: data.bank_account_number,
            },
            this.httpOptions
        );
    }
}
