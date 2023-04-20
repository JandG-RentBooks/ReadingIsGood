import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../Services/login.service";
import {StorageService} from "../../Services/storage.service";
import {AuthService} from "../../helper/auth.service";
import {Router} from "@angular/router";
import {SharedService} from "../../Services/Admin/shared.service";

declare var window: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    modalError: any
    subscriptionTypeList: any = []
    isMessage = false
    isError = false
    hide = true;

    form = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        address: new FormControl('', [Validators.required]),
        phone_number: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        c_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        subscription_type_id: new FormControl(''),
    })

    constructor(
        private loginService: LoginService,
        private storageService: StorageService,
        private authService: AuthService,
        private route: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.index()
    }

    index(): void {
        this.loginService.index().subscribe({
            next: data => {
                this.subscriptionTypeList = data
            },
            error: err => {
            }
        });
    }

    onSubmit(): void {
        if (!this.form.valid) {
            return
        }
        this.sharedService.showUiCover()
        this.loginService.register(this.form.value).subscribe({
            next: data => {
                this.sharedService.scrollTop()
                if (data.success) {
                    this.isMessage = true
                } else {
                    this.isError = true
                }
                this.sharedService.hideUiCover()
            },
            error: err => {
                this.sharedService.scrollTop()
                this.isError = true
                this.sharedService.hideUiCover()
            }
        });
    }

}
