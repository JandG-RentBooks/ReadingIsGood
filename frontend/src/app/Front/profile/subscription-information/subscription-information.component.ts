import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../../Services/Admin/shared.service";
import {ProfileService} from "../../../Services/Front/profile.service";

@Component({
  selector: 'app-subscription-information',
  templateUrl: './subscription-information.component.html',
  styleUrls: ['./subscription-information.component.scss']
})
export class SubscriptionInformationComponent {

    subscriptions: any[] = []
    activeSubscription: any = null
    subscriptionIsValid: any = null
    userData: any = []
    systemSettings: any = []

    constructor(private profileService: ProfileService) {}

    ngOnInit(): void {
        this.getSubscriptions()
    }

    getSubscriptions(): void {
        this.profileService.getSubscriptions().subscribe({
            next: data => {
                this.subscriptions = data.items
                this.activeSubscription = data.subscription_type_id
                this.userData = data.userData
                this.systemSettings = data.systemSettings
                this.subscriptionIsValid = data.subscriptionIsValid
            },
            error: error => {

            }
        })
    }

    setActive(id: number): void {
        this.profileService.updateActiveSubscription(id).subscribe({
            next: data => {
                if(data.success){
                    this.getSubscriptions()
                }
            },
            error: error => {

            }
        })
    }

}
