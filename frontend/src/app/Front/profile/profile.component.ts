import {Component} from '@angular/core';
import {ProfileService} from "../../Services/Front/profile.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

    visibilityOptions: any = {
        showWishList: true,
        showCurrentRent: false,
        showRentHistory: false,
        showSubscriptionInformation: false,
        showData: false,
        showAddresses: false,
    }

    warnings: string[] = []

    constructor(private profileService: ProfileService) {
        this.checkUserData()
    }

    setVisibility(v: string, e: any): void {
        const buttons = document.querySelectorAll('.list-group-item')
        buttons.forEach((btn: any) => {
            if (btn !== null) {
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active')
                }
            }
        })
        e.target.classList.add('active')

        for (let item in this.visibilityOptions) {
            this.visibilityOptions[item] = false
        }
        this.visibilityOptions[v] = true

        if (v === 'showWishList') {
            this.checkUserData()
        }
    }

    checkUserData(): void {
        this.warnings = []
        this.profileService.checkUserData().subscribe({
            next: data => {
                console.log(data)
                if (!data.user.active_shipping_address_id) {
                    this.warnings.push('Nincs beállítva aktív szállítási cím.')
                }
                if (!data.user.subscription_type_id) {
                    this.warnings.push('Nincs beállítva előfizetés')
                }
                if (!data.user.wishlist) {
                    this.warnings.push('Nincs beállítva kivánságlista')
                }
                if (data.user.wishlist.length < 3) {
                    this.warnings.push('A kivánságlistában kevés a könyv')
                }
                if (!data.last_payment_date) {
                    this.warnings.push('Nincs érvényes előfizetése')
                }

            },
            error: err => {

            }
        })
    }
}
