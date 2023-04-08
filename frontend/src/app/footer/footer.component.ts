import {Component, OnInit} from '@angular/core';
import {AuthService} from "../helper/auth.service";
import {StorageService} from "../Services/storage.service";
import {IndexService} from "../Services/Front/index.service";
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    showAdminFooter = false
    dateCopyright: any
    company: any

    constructor(
        private authService: AuthService,
        private indexService: IndexService,
        private storageService: StorageService,) {
    }

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.showAdminFooter = location.href.split('/').includes('admin')
        }
        this.getCompany()
        this.dateCopyright = new Date().getFullYear()
    }

    getCompany(): void {
        this.indexService.getCompany().subscribe({
            next: data => {
                this.company = data.company_name
            },
            error: err => {

            }
        })
    }

}
