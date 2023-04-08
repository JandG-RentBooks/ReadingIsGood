import { Component } from '@angular/core';
import {DashboardService} from "../../../Services/Admin/dashboard.service";

@Component({
  selector: 'app-testimonials-moderate',
  templateUrl: './testimonials-moderate.component.html',
  styleUrls: ['./testimonials-moderate.component.scss']
})
export class TestimonialsModerateComponent {

    mainCollection: any = []

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit(): void {
        this.getTestimonials()
    }

    getTestimonials(): void {
        this.dashboardService.getUncheckedReferenceComment().subscribe({
            next: data => {
                console.log(data)
                this.mainCollection = data.items
            },
            error: err => {}
        })
    }

    check(id: number): void {
        this.dashboardService.referenceCommentChecked(id).subscribe({
            next: data => {
                console.log(data)
                if(data.success){
                    this.getTestimonials()
                }
            },
            error: err => {}
        })
    }

    inactivate(id: number): void {
        this.dashboardService.referenceCommentInactivate(id).subscribe({
            next: data => {
                console.log(data)
                if(data.success){
                    this.getTestimonials()
                }
            },
            error: err => {}
        })
    }


}
