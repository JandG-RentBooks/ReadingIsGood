import {Component} from '@angular/core';

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
    }
}
