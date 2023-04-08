import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../Services/storage.service";
import {AuthService} from "../../../helper/auth.service";
import {Router} from "@angular/router";
import {SharedService} from "../../../Services/Admin/shared.service";
import {ProfileService} from "../../../Services/Front/profile.service";

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent {
    hide = true;

    form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        phone_number: new FormControl(''),
        password: new FormControl('', [Validators.minLength(8)]),
        c_password: new FormControl('', [Validators.minLength(8)]),
    })

    userData: any = []

    constructor(private profileService: ProfileService, private fb: FormBuilder, private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.getData()
    }

    getData(): void {
        this.profileService.getUser().subscribe({
            next: data => {
                console.log(data)
                this.userData = data
                this.form.patchValue({
                    name: data.name,
                    address: data.address,
                    phone_number: data.phone_number,
                })
            },
            error: err => {

            }
        })
    }

    onSubmit(): void {
        if (!this.form.valid) {
            return
        }

        this.sharedService.showPostCover()
        this.profileService.updateUser(this.form.value).subscribe({
            next: data => {
                this.sharedService.hidePostCover()
                if (data.success) {
                    // @ts-ignore
                    document.querySelector('.toast_-body').innerHTML = this.sharedService.texts.msg_update_success
                    this.sharedService.openToast('SaveSuccessToast')
                }
            },
            error: err => {
                this.sharedService.hidePostCover()
            }
        })
    }
}
