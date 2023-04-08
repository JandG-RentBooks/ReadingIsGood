import {Component} from '@angular/core';
import {DashboardService} from "../../../Services/Admin/dashboard.service";

@Component({
    selector: 'app-stat-cards',
    templateUrl: './stat-cards.component.html',
    styleUrls: ['./stat-cards.component.scss']
})
export class StatCardsComponent {

    allRegisteredUsers = 0
    allSubscribedUsers = 0
    allBooks = 0
    allRentedBooks = 0
    allLendings = 0
    allCurrentLendings = 0
    allTestimonials = 0
    moderatedTestimonials = 0

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit(): void {
        this.getStatCardsData()
    }

    getStatCardsData(): void {
        this.dashboardService.getStatCardsData().subscribe({
            next: data => {
                console.log(data)
                this.allRegisteredUsers = data.allRegisteredUsers
                this.allSubscribedUsers = data.allSubscribedUsers
                this.allBooks = data.allBooks
                this.allRentedBooks = data.allRentedBooks
                this.allLendings = data.allLendings
                this.allCurrentLendings = data.allCurrentLendings
                this.allTestimonials = data.allTestimonials
                this.moderatedTestimonials = data.moderatedTestimonials
            },
            error: error => {
                console.log(error)
            }
        })
    }
}
