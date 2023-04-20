import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../Services/login.service";
import {StorageService} from "../../Services/storage.service";
import {AuthService} from "../../helper/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../Services/Admin/shared.service";

declare var window: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    token: string | null | undefined
    email: string | null | undefined

    isLoginForm = true
    isPasswordResetForm = false
    isNewPasswordForm = false

    isMessage = false
    isTokenError = false
    isError = false
    isDone = false
    hide = true;

    isLoggedIn = false;
    roles: string[] = [];
    modalError: any

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    })

    formPasswordReset = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
    })

    formNewPassword = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        c_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })


    constructor(
        private activatedRoute: ActivatedRoute,
        private loginService: LoginService,
        private storageService: StorageService,
        private authService: AuthService,
        private route: Router,
        private sharedService: SharedService) {

        this.activatedRoute.paramMap.subscribe((params) => {
            this.email = params.get('email')
            this.token = params.get('token')
        })
        if (this.token && this.email) {
            this.showNewPassword()
        }
    }

    ngOnInit(): void {
        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
            if(this.authService.isUser()){}
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
                this.sharedService.hideUiCover()
            }
        });
    }

    onSubmitPasswordReset(): void {
        if (!this.formPasswordReset.valid) {
            return
        }
        this.sharedService.showUiCover()
        this.loginService.passwordReset(this.formPasswordReset.value).subscribe({
            next: data => {
                if (data.success) {
                    this.isMessage = true
                } else {
                    this.isError = true
                }
                this.sharedService.hideUiCover()
            },
            error: err => {
                this.isError = true
                this.sharedService.hideUiCover()
            }
        });
    }


    onSubmitNewPassword(): void {
        if (!this.formNewPassword.valid) {
            return
        }
        this.sharedService.showUiCover()
        this.loginService.newPassword({form: this.formNewPassword.value, token: this.token}).subscribe({
            next: data => {
                if (data.success) {
                    this.isDone = true
                    this.showLogin()
                } else {
                    this.isTokenError = true
                }
                this.sharedService.hideUiCover()
            },
            error: err => {
                this.isError = true
                this.sharedService.hideUiCover()
            }
        });
    }


    showPasswordReset(): void {
        this.isLoginForm = false
        this.isPasswordResetForm = true
        this.isNewPasswordForm = false
    }

    showLogin(): void {
        this.isLoginForm = true
        this.isPasswordResetForm = false
        this.isNewPasswordForm = false
    }


    showNewPassword(): void {
        this.isLoginForm = false
        this.isPasswordResetForm = false
        this.isNewPasswordForm = true

        this.formNewPassword.patchValue({
            email: this.email
        })
    }


}
