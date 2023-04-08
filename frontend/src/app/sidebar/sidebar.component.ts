import {Component, OnInit} from '@angular/core';
import {AuthService} from "../helper/auth.service";
import {StorageService} from "../Services/storage.service";
import {LogoutService} from "../Services/logout.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    showSidebar = false
    showLogoutLink = false
    userName: string = ''

    roles: any = {
        isAdmin: false,
        isEmployee: false,
        isUser: false,
    }

    constructor(
        private authService: AuthService,
        private storageService: StorageService,
        private logOutService: LogoutService) {
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.roles.isAdmin = this.authService.isAdmin()
            this.roles.isEmployee = this.authService.isEmployee()

            this.showSidebar = location.href.split('/').includes('admin') && (this.authService.isAdmin() || this.authService.isEmployee())
            this.showLogoutLink = true

            this.userName = this.authService.getUserName()

        }
    }


}
