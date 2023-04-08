import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StorageService} from "../storage.service";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    httpOptions = {
        params: {},
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storageService.getUser().token}`
        })
    };

    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    getWishlist(): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `profile/wishlist`,
            this.httpOptions
        );
    }

    sortWishlist(list: any): Observable<any> {
        this.httpOptions.params = {}
        return this.http.patch(
            API_URL + `profile/wishlist`,
            {
                wishlist: list
            },
            this.httpOptions
        );
    }

    removeWishlist(id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.post(
            API_URL + `profile/wishlist/delete`,
            {
                id: id
            },
            this.httpOptions
        );
    }

    getUser(): Observable<any> {
        this.httpOptions.params = {}
        console.log('getUser')
        return this.http.get(
            API_URL + `profile/user`,
            this.httpOptions
        );
    }

    updateUser(data: any): Observable<any> {
        this.httpOptions.params = {}
        return this.http.patch(
            API_URL + `profile/user`,
            {
                name: data.name,
                password: data.password,
                address: data.address,
                phone_number: data.phone_number
            },
            this.httpOptions
        );
    }

    getShippingAddresses(): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `profile/shipping-address`,
            this.httpOptions
        );
    }

    storeShippingAddress(data: any): Observable<any> {
        this.httpOptions.params = {}
        console.log('storeShippingAddress')
        return this.http.post(
            API_URL + 'profile/shipping-address',
            {
                zip_code: data.zip_code,
                city: data.city,
                address: data.address
            },
            this.httpOptions
        );
    }

    updateShippingAddress(data: any, id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.patch(
            API_URL + `profile/shipping-address/${id}`,
            {
                zip_code: data.zip_code,
                city: data.city,
                address: data.address
            },
            this.httpOptions
        );
    }

    removeShippingAddress(id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.delete(
            API_URL + `profile/shipping-address/${id}`,
            this.httpOptions
        );
    }

    updateActiveShippingAddress(id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.patch(
            API_URL + `profile/shipping-address`,
            {
                shipping_address_id: id
            },
            this.httpOptions
        );
    }

    getSubscriptions(): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `profile/subscriptions`,
            this.httpOptions
        );
    }

    updateActiveSubscription(id: number): Observable<any> {
        this.httpOptions.params = {}
        return this.http.patch(
            API_URL + `profile/subscription`,
            {
                subscription_type_id : id
            },
            this.httpOptions
        );
    }

    getLending(): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `profile/lending`,
            this.httpOptions
        );
    }

    getLendingHistory(): Observable<any> {
        this.httpOptions.params = {}
        return this.http.get(
            API_URL + `profile/lending/history`,
            this.httpOptions
        );
    }

}
