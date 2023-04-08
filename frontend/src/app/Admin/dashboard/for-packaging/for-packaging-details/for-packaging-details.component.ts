import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from "../../../../Services/Admin/dashboard.service";
import {SharedService} from "../../../../Services/Admin/shared.service";

@Component({
    selector: 'app-for-packaging-details',
    templateUrl: './for-packaging-details.component.html',
    styleUrls: ['./for-packaging-details.component.scss']
})
export class ForPackagingDetailsComponent {

    @Input()
    selectedItem: any

    @Output()
    closeEventEmitter = new EventEmitter()

    @Output()
    saveEventEmitter = new EventEmitter()

    lendingData: any = {}
    checkedBookSet: any = []
    showIsDone = false
    isConfirmed = false

    constructor(private dashboardService: DashboardService, private sharedService: SharedService) {
    }

    ngOnChanges() {
        this.lendingData = this.selectedItem
        this.checkedBookSet = []
    }

    check(id: number): void {
        this.checkedBookSet.push(id)
        if(this.lendingData.books.length === this.checkedBookSet.length){
            this.showIsDone = true
        }
    }

    unCheck(id: number): void {
        this.checkedBookSet = this.checkedBookSet.filter((item: any) => item != id)
        this.showIsDone = false
    }

    printQr() {
        // @ts-ignore
        const divContents: any = document.getElementById("qrcodeImage").innerHTML;
        let a: any = window.open('', '', 'height=500, width=500');
        a.document.write('<html>');
        a.document.write('<body style="width: 300px; height: 350px; text-align: center;border: 2px dashed #cccccc; padding: 10px;">');
        a.document.write(divContents);
        a.document.write('</body></html>');
        a.document.close();
        a.print();
    }

    done(): void {
        this.sharedService.showPostCover()
        this.dashboardService.updateLendingState({lending_id: this.lendingData.id, state: 3}).subscribe({
            next: data => {
                console.log(data)
                if (data.success) {
                    this.sendMail()
                }
            },
            error: err => {
                console.log(err)
                this.sharedService.hidePostCover()
            }
        })
    }

    sendMail():void {
        this.dashboardService.sendNewLendingEmail({user_id: this.lendingData.user.id, shipping_token: this.lendingData.shipping_token}).subscribe({
            next: data => {
                console.log(data)
                let result = data.success
                this.saveEventEmitter.emit(result)
                this.sharedService.hidePostCover()
            },
            error: err => {
                console.log(err)
                this.sharedService.hidePostCover()
            }
        })
    }

    close(): void {
        this.closeEventEmitter.emit()
    }
}
