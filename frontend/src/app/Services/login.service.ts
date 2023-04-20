import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;
const BASE_URL = environment.baseUrl;

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {
    }

    index(): Observable<any> {
        return this.http.get(API_URL + 'register', httpOptions);
    }

    login(data: any): Observable<any> {
        return this.http.post(
            API_URL + 'login',
            {
                email: data.email,
                password: data.password,
            },
            httpOptions
        );
    }

    passwordReset(data: any): Observable<any> {
        return this.http.post(
            API_URL + 'password-reset',
            {
                email: data.email,
                url: BASE_URL + 'login'
            },
            httpOptions
        );
    }


    newPassword(data: any): Observable<any> {
        return this.http.post(
            API_URL + 'new-password',
            {
                email: data.form.email,
                password: data.form.password,
                c_password: data.form.c_password,
                token: data.token
            },
            httpOptions
        );
    }


    register(data: any): Observable<any> {
        return this.http.post(
            API_URL + 'register',
            {
                name: data.name,
                username: data.username,
                email: data.email,
                address: data.address,
                phone_number: data.phone_number,
                password: data.password,
                c_password: data.c_password,
                subscription_type_id: data.subscription_type_id,
                url: BASE_URL + 'user-verify'
            },
            httpOptions
        );
    }

    userVerify(token: any): Observable<any> {
        return this.http.post(
            API_URL + 'user-verify',
            {
                token: token
            },
            httpOptions
        );
    }
}
