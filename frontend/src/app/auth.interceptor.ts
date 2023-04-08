import {Component, ComponentRef, Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ErrorAuthComponent} from "./Errors/error-auth/error-auth.component";
import {ErrorLoginComponent} from "./Errors/error-login/error-login.component";
import {ErrorAdminComponent} from "./Errors/error-admin/error-admin.component";
import {StorageService} from "./Services/storage.service";
import {AuthService} from "./helper/auth.service";


declare var window: any;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public dialog: MatDialog, private storageService: StorageService,
                private authService: AuthService,) {
    }

    // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //     return next.handle(request).pipe(
    //         map((event: HttpEvent<any>) => {
    //             if (event instanceof HttpResponse) {
    //                 console.log('event--->>>', event);
    //             }
    //             return event;
    //         }));
    // }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // @ts-ignore
        return next.handle(request).pipe(catchError((error: any, caught: Observable<HttpEvent<any>>) => {
            if (error.status === 401) {
                return this.dialog.open(ErrorLoginComponent, {
                    panelClass: 'dialog-error-admin'
                })
            }
            if (error.status === 403) {
                this.storageService.clean()
                return this.dialog.open(ErrorAuthComponent)
            }
            if (error.status === 422)  {
                return this.dialog.open(ErrorAdminComponent, {
                    data: {error: error},
                    panelClass: 'dialog-error-admin'
                })
            }
        }));
    }
}

