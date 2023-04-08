import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {AuthService} from "./helper/auth.service";
import {Router, NavigationEnd} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'Rent Books';
    isAdmin = false
    currentRoute: string | undefined;

    constructor(private authService: AuthService, private router: Router) {
        console.log('this.route.url')
        console.log(this.router.url)
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.isAdmin = location.href.split('/').includes('admin')
        }
    }
}
