import { Component } from '@angular/core';
import {ProfileService} from "../../../Services/Front/profile.service";

@Component({
  selector: 'app-my-current-rent',
  templateUrl: './my-current-rent.component.html',
  styleUrls: ['./my-current-rent.component.scss']
})
export class MyCurrentRentComponent {
    lending: any = {}
    isLending = false
    isDone = false

    constructor(private profileService: ProfileService) {
        this.getLending()
    }

    ngOnInit(): void {
    }

    getLending(): void {
        this.profileService.getLending().subscribe({
            next: data => {
                console.log(data)
                this.lending = data
                this.isLending = Object.keys(this.lending).length > 0
                this.isDone = true
            },
            error: error => {
                console.log(error)
            }
        })
    }
}
