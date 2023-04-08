import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../Services/storage.service";
import {AuthService} from "../../../helper/auth.service";
import {Router} from "@angular/router";
import {SharedService} from "../../../Services/Admin/shared.service";
import {ProfileService} from "../../../Services/Front/profile.service";

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent {

    shippingAddresses: any
    activeAddress: any
    isEdit = false
    selectedItemId: any = null

    formAddresses = new FormGroup({
        zip_code: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
    })

    constructor(private profileService: ProfileService, private fb: FormBuilder, private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.getShippingAddresses()
    }

    getShippingAddresses(): void {
        this.profileService.getShippingAddresses().subscribe({
            next: data => {
                console.log(data)
                this.shippingAddresses = data.items
                this.activeAddress = data.active
            },
            error: err => {

            }
        })
    }

    onSubmit(): void {
        if (!this.formAddresses.valid) {
            return
        }
        this.sharedService.showUiCover()
        if (this.isEdit) {
            this.profileService.updateShippingAddress(this.formAddresses.value, this.selectedItemId).subscribe({
                next: data => {
                    this.sharedService.hideUiCover()
                    if (data.success) {
                        //this.formAddresses.reset()
                        this.getShippingAddresses()
                    }
                },
                error: err => {
                    this.sharedService.hideUiCover()
                }
            })
        } else {
            this.profileService.storeShippingAddress(this.formAddresses.value).subscribe({
                next: data => {
                    this.sharedService.hideUiCover()
                    if (data.success) {
                        //this.formAddresses.reset()
                        this.getShippingAddresses()
                    }
                },
                error: err => {
                    this.sharedService.hideUiCover()
                }
            })
        }
    }

    editAddress(id: number): void {
        this.shippingAddresses.forEach((item: any) => {
            if (item.id === id) {
                this.isEdit = true
                this.selectedItemId = id
                this.formAddresses.patchValue({
                    zip_code: item.zip_code,
                    city: item.city,
                    address: item.address,
                })
            }
        })
    }

    reset(): void {
        this.isEdit = false
        this.selectedItemId = null
        this.formAddresses.reset()
    }

    remove(id: number): void {
        this.profileService.removeShippingAddress(id).subscribe({
            next: data => {
                this.getShippingAddresses()
            },
            error: err => {

            }
        })
    }

    setActive(id: number): any {
        this.profileService.updateActiveShippingAddress(id).subscribe({
            next: data => {
                this.getShippingAddresses()
            },
            error: err => {

            }
        })
    }

}
