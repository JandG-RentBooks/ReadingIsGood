import {Component, Input} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BooksService} from "../../../Services/Front/books.service";
import {SharedService} from "../../../Services/Admin/shared.service";

const API_URL = environment.apiUrl;

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

    @Input()
    bookId: any

    @Input()
    show: any

    @Input()
    wishList: any

    active = false

    constructor(private booksService: BooksService, private sharedService: SharedService) {
    }

    ngOnInit(): void {
        if (this.show) {
            this.init()
        }
    }

    init(): void {
        this.active = this.wishList.includes(this.bookId)
    }

    refresh(): void { //refresh
        this.booksService.initWishList(this.bookId).subscribe({
            next: data => {
                this.active = data.isInWishlist
            },
            error: error => {
            }
        })
    }

    addToWishList(): void {
        this.sharedService.showUiCover()
        this.booksService.addToWishList(this.bookId).subscribe({
            next: data => {
                console.log()
                if (data.success) {
                    this.sharedService.hideUiCover()
                    this.refresh()
                }
            },
            error: error => {
                this.sharedService.hideUiCover()
            }
        })
    }

}
