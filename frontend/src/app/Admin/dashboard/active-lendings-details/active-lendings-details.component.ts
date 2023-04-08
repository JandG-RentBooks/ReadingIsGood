import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from "../../../Services/Admin/dashboard.service";

@Component({
  selector: 'app-active-lendings-details',
  templateUrl: './active-lendings-details.component.html',
  styleUrls: ['./active-lendings-details.component.scss']
})
export class ActiveLendingsDetailsComponent {

    @Input()
    selectedItem: any

    @Output()
    closeEventEmitter = new EventEmitter()

    lendingData: any = {}

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit(): void {
        this.getLending()
    }

    getLending(): void {
        this.dashboardService.getLending(this.selectedItem.id).subscribe({
            next: data => {
                console.log(data)
                this.lendingData = data
            },
            error: err => {

            }
        })
    }

    close(): void {
        this.closeEventEmitter.emit()
    }
}
