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
                this.openErrorModal(err)
            }
        });
    }

    onSubmit(): void {
        if (!this.form.valid) {
            return
        }
        this.loginService.register(this.form.value).subscribe({
            next: data => {
                if (data.success) {
                    this.isMessage = true
                    this.sharedService.sleep(2000).then(() => {
                        location.href = '/'
                    })
                }
            },
            error: err => {
                //this.openErrorModal(err)
            }
        });
    }

    openErrorModal(err: any) {
        console.log('openErrorModal')
        //console.log(err)
        this.modalError = new window.bootstrap.Modal(document.getElementById('errorModal'))
        let errorText = document.querySelector('.error-text')
        if (errorText) {
            errorText.innerHTML = ''
            errorText.innerHTML = this.sharedService.errorHandler(err)
            this.modalError.toggle()
        }
    }

}
