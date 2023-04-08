import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from "../../../../Services/Admin/dashboard.service";
import {SharedService} from "../../../../Services/Admin/shared.service";

@Component({
    selector: 'app-new-lending-panel',
    templateUrl: './new-lending-panel.component.html',
    styleUrls: ['./new-lending-panel.component.scss']
})
export class NewLendingPanelComponent {

    @Input()
    selectedItem: any

    @Output()
    saveEventEmitter = new EventEmitter()

    createdLendingId: number = 0
    user: any = {}
    wishlist: any = []
    wishlistSet: any = []
    maxBook = 0
    addedBook = 0
    createStep = true
    wishlistStep = false
    doneStep = false
    isConfirmed = false

    constructor(private dashboardService: DashboardService, private sharedService: SharedService) {
    }

    ngOnChanges() {
        this.getUser()
    }

    ngOnInit(): void {
        //this.getUser()
    }

    getUser(): void {
        this.dashboardService.getUser(this.selectedItem.id).subscribe({
            next: data => {
                console.log(data)
                this.user = data.user
                this.wishlist = data.wishlist
                this.maxBook = data.user?.subscription_type?.book_number
            },
            error: err => {

            }
        })
    }

    storeLending(): void {
        this.sharedService.showPostCover()
        this.dashboardService.storeLending({user_id: this.selectedItem.id}).subscribe({
            next: data => {
                console.log(data)
                if (data.success) {
                    this.createdLendingId = data.id
                    this.wishlistStep = true
                    this.sharedService.hidePostCover()
                }
            },
            error: err => {
                console.log(err)
                this.sharedService.hidePostCover()
            }
        })
    }

    addBookToLending(item: any): void | boolean {
        if(this.addedBook === this.maxBook){
            return false
        }
        this.dashboardService.addBookToLending({lending_id: this.createdLendingId, book_id: item.id}).subscribe({
            next: data => {
                console.log(data)
                if (data.success) {
                    this.wishlistSet.push(item)
                    this.wishlist = this.wishlist.filter((obj: any) => obj.wishlist_id != item.wishlist_id)
                    this.addedBook++
                }
            },
            error: err => {
                console.log(err)
            }
        })
    }

    removeBook(item: any): void {
        this.dashboardService.removeBook({lending_id: this.createdLendingId, book_id: item.id}).subscribe({
            next: data => {
                console.log(data)
                if (data.success) {
                    this.wishlist.push(item)
                    this.wishlistSet = this.wishlistSet.filter((obj: any) => obj.wishlist_id != item.wishlist_id)
                    this.addedBook--
                }
            },
            error: err => {
                console.log(err)
            }
        })
    }

    done(): void {
        this.sharedService.showPostCover()
        this.removeBooksFromUserWishlist()
    }

    removeBooksFromUserWishlist(): void {
        const bookIdSet: number[] = []
        this.wishlistSet.forEach((item: any) => {
            bookIdSet.push(item.id)
        })
        this.dashboardService.removeBooksFromUserWishlist({user_id: this.selectedItem.id, books: bookIdSet}).subscribe({
            next: data => {
                console.log(data)
                if (data.success) {
                    this.updateLendingState(2)
                }
            },
            error: err => {
                console.log(err)
            }
        })
    }

    updateLendingState(s: number): void {
        this.dashboardService.updateLendingState({lending_id: this.createdLendingId, state: s}).subscribe({
            next: data => {
                console.log(data)
                if (data.success) {
                    if(s === 1){
                        this.doneStep = true
                    }
                    if(s === 2){
                        this.sharedService.hidePostCover()
                        this.saveEventEmitter.emit(true)
                    }
                }
            },
            error: err => {
                console.log(err)
            }
        })
    }


    close(): void {
        this.saveEventEmitter.emit()
    }
}
