import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from "../../../../Services/Admin/dashboard.service";
import {SharedService} from "../../../../Services/Admin/shared.service";

@Component({
  selector: 'app-recaived-packages-details',
  templateUrl: './recaived-packages-details.component.html',
  styleUrls: ['./recaived-packages-details.component.scss']
})
export class RecaivedPackagesDetailsComponent {

    @Input()
    selectedItem: any

    @Output()
    closeEventEmitter = new EventEmitter()

    @Output()
    saveEventEmitter = new EventEmitter()

    lendingData: any = {}
    checkedBookSet: any = []
    showIsDone = false

    constructor(private dashboardService: DashboardService, private sharedService: SharedService) {
    }

    ngOnChanges() {
        this.lendingData = this.selectedItem
        this.checkedBookSet = []
    }

    bookScrapping(bookId: number): void {
        this.sharedService.showPostCover()
        this.dashboardService.bookScrapping(this.lendingData.id, bookId).subscribe({
            next: data => {
                if(data.success){
                    this.checkedBookSet.push(bookId)
                    this.check()
                    this.sharedService.hidePostCover()
                }
            },
            error: err => {
                console.log(err)
                this.sharedService.hidePostCover()
            }
        })
    }

    increaseBookAvailableNumber(bookId: number): void {
        this.sharedService.showPostCover()
        this.dashboardService.increaseBookAvailableNumber(this.lendingData.id, bookId).subscribe({
            next: data => {
                if(data.success){
                    this.checkedBookSet.push(bookId)
                    this.check()
                    this.sharedService.hidePostCover()
                }
            },
            error: err => {
                console.log(err)
                this.sharedService.hidePostCover()
            }
        })
    }

    check(): void {
        if(this.lendingData.books.length === this.checkedBookSet.length){
            this.showIsDone = true
        }
    }

    close(): void {
        this.closeEventEmitter.emit()
    }

    isDone(): void {
        this.saveEventEmitter.emit()
    }
}
