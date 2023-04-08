import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../Services/login.service";
import {StorageService} from "../../Services/storage.service";
import {AuthService} from "../../helper/auth.service";
import {Router} from "@angular/router";
import {SharedService} from "../../Services/Admin/shared.service";

declare var window: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    isLoggedIn = false;
    roles: string[] = [];
    modalError: any

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    })

    constructor(
        private loginService: LoginService,
        private storageService: StorageService,
        private authService: AuthService,
        private route: Router,
        private sharedService: SharedService) {
    }

    ngOnInit(): void {
        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
            this.route.navigate(['/']).then(r => null)
        }
    }

    onSubmit(): void {
        if (!this.form.valid) {
            return
        }
        this.loginService.login(this.form.value).subscribe({
            next: data => {
                if (data.success) {
                    this.storageService.setUser(data.data);
                    this.isLoggedIn = true;
                    this.roles = this.storageService.getUser().roles;
                    location.reload()
                }
            },
            error: err => {
                //this.openErrorModal(err)
            }
        });
    }

    openErrorModal(err: any) {
        this.modalError = new window.bootstrap.Modal(document.getElementById('errorModal'))
        let errorText = document.querySelector('.error-text')
        if (errorText) {
            errorText.innerHTML = ''
            errorText.innerHTML = this.sharedService.errorHandler(err)
            this.modalError.toggle()
        }
    }

}
