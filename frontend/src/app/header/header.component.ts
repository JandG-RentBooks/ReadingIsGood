import {Component, OnInit} from '@angular/core';
import {AuthService} from "../helper/auth.service";
import {StorageService} from "../Services/storage.service";
import {LogoutService} from "../Services/logout.service";
import {MenuItem} from 'primeng/api';
import {Router, NavigationEnd} from "@angular/router";
import {SharedService} from "../Services/Admin/shared.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    menuStrings = [
        {path: 'dashboard', name: 'Dashboard'},
        {path: 'users', name: 'Felhasználók'},
        {path: 'books', name: 'Könyvek'},
        {path: 'authors', name: 'Szerzők'},
        {path: 'publishers', name: 'Kiadók'},
        {path: 'categories', name: 'Kategóriák'},
        {path: 'cover-types', name: 'Borító típusok'},
        {path: 'labels', name: 'Cimkék'},
        {path: 'image-storage', name: 'Médiatár'},
        {path: 'subscription-type', name: 'Előfizetés típusok'},
        {path: 'system-settings', name: 'Rendszer beállítások'},
    ]

    showAdminMenu = false
    showLogoutLink = false
    showLoginLink = false
    showProfileLink = false
    showAdminLink = false

    userName: string = ''
    currentRoute: string = ''

    roles: any = {
        isAdmin: false,
        isEmployee: false,
        isUser: false,
    }

    constructor(
        private authService: AuthService,
        private storageService: StorageService,
        private logOutService: LogoutService,
        private sharedService: SharedService,
        private router: Router) {
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.roles.isAdmin = this.authService.isAdmin()
            this.roles.isEmployee = this.authService.isEmployee()
            this.roles.isUser = this.authService.isUser()

            this.showAdminLink = this.authService.isAdmin() || this.authService.isEmployee()

            this.showAdminMenu = location.href.split('/').includes('admin') && this.showAdminLink
            this.showLogoutLink = true
            this.showProfileLink = this.authService.isUser()

            this.userName = this.authService.getUserName()
            if (this.showAdminMenu) {
                this.router.events.subscribe((event: any) => {
                    if (event instanceof NavigationEnd) {
                        this.currentRoute = event.url;

                        let url = this.currentRoute.split('/')
                        let lastItem = this.menuStrings.filter((item: any) => {
                            if (item.path == url[2]) {
                                return item
                            }
                        })
                        this.items = [
                            {label: `${url[1]}`},
                            {label: `${lastItem[0].name}`},
                        ];

                        this.home = {icon: 'pi pi-home', routerLink: '/admin/dashboard'};
                    }
                    this.sharedService.scrollTop()
                    this.sharedService.showScrollbar()
                });
            }
        } else {
            this.showLoginLink = true
        }
    }

    openSidebar() {
        this.navClickListener()
    }

    navClickListener() {
        const sidebar = document.querySelector('#sidebarMenu')
        const navItems = document.querySelectorAll('#sidebarMenu .nav-item')
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (sidebar !== null) {
                    sidebar.classList.remove('show')
                }
            })
        })
    }

    logOut(): void {
        console.log('logOut')
        this.logOutService.logout().subscribe({
            next: data => {
                console.log(data)
            },
            error: error => {
                console.log(error)
            }
        });
        this.storageService.clean()
        location.reload()
    }

}
