import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "../../Services/login.service";
import {SharedService} from "../../Services/Admin/shared.service";

@Component({
    selector: 'app-user-verify',
    templateUrl: './user-verify.component.html',
    styleUrls: ['./user-verify.component.scss']
})
export class UserVerifyComponent {

    token: string | null | undefined
    isProcessed = false
    isVerify = false
    isError = false

    constructor(
        private activatedRoute: ActivatedRoute,
        private loginService: LoginService,
        private sharedService: SharedService) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params) => {
            this.token = params.get('token');
        })
        if (this.token) {
            this.userVerify()
        }
    }

    userVerify(): void {
        this.loginService.userVerify(this.token).subscribe({
            next: data => {
                if (data.success) {
                    this.isProcessed = true
                    this.isVerify = true
                    this.sharedService.sleep(3000).then(() => {
                        location.href = 'login'
                    })
                } else {
                    this.isProcessed = true
                    this.isError = true
                }
            },
            error: err => {
                console.log(err)
                this.isProcessed = true
                this.isError = true
            }
        });
    }
}
