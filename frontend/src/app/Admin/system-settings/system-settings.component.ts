import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SystemSettingsService} from "../../Services/Admin/system-settings.service";
import {SharedService} from "../../Services/Admin/shared.service";

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent {

    id: number = 0

    constructor(private systemSettingsService: SystemSettingsService, private sharedService: SharedService) {
        this.create()
    }

    form = new FormGroup({
        company_name: new FormControl('', [Validators.required]),
        company_address: new FormControl('', [Validators.required]),
        company_email: new FormControl('', [Validators.required]),
        company_phone_number: new FormControl('', [Validators.required]),
        company_manager: new FormControl('', [Validators.required]),
        company_tax_number: new FormControl('', [Validators.required]),
        bank: new FormControl('', [Validators.required]),
        bank_account_number: new FormControl('', [Validators.required]),
    })

    create(): void {
        this.systemSettingsService.create().subscribe({
            next: data => {
                console.log(data)
                this.id = data.id
                this.form.patchValue({
                    company_name: data.company_name,
                    company_address: data.company_address,
                    company_email: data.company_email,
                    company_phone_number: data.company_phone_number,
                    company_manager: data.company_manager,
                    company_tax_number: data.company_tax_number,
                    bank: data.bank,
                    bank_account_number: data.bank_account_number,
                })
            },
            error: err => {
            }
        })
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.update()
        }
    }

    update(): void {
        this.sharedService.showPostCover()
        this.systemSettingsService.update(this.form.value, this.id).subscribe({
            next: data => {
                this.sharedService.hidePostCover()
                if (data.success) {
                    // @ts-ignore
                    document.querySelector('.toast_-body').innerHTML = this.sharedService.texts.msg_update_success
                    this.sharedService.openToast('SaveSuccessToast')
                } else {

                }
            },
            error: err => {
                this.sharedService.hidePostCover()
            }
        })
    }
}
