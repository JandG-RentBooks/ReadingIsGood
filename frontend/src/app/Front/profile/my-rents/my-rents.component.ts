import { Component } from '@angular/core';
import {ProfileService} from "../../../Services/Front/profile.service";

@Component({
  selector: 'app-my-rents',
  templateUrl: './my-rents.component.html',
  styleUrls: ['./my-rents.component.scss']
})
export class MyRentsComponent {
    lendings: any = {}
    isDone = false

    constructor(private profileService: ProfileService) {
        this.getLendings()
    }

    ngOnInit(): void {

    }

    getLendings(): void {
        this.profileService.getLendingHistory().subscribe({
            next: data => {
                this.lendings = data
                this.isDone = true
            },
            error: error => {
                console.log(error)
            }
        })
    }
}
