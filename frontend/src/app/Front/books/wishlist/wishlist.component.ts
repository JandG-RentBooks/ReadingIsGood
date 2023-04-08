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

    active = false

    constructor(private booksService: BooksService, private sharedService: SharedService) {
    }

    ngOnInit(): void {
        if (this.show) {
            this.init()
        }
    }

    init(): void {
        this.booksService.initWishList(this.bookId).subscribe({
            next: data => {
                this.active = data.isInWishlist
                this.sharedService.hideUiCover()
            },
            error: error => {
                this.sharedService.hideUiCover()
            }
        })
    }

    addToWishList(): void {
        this.sharedService.showUiCover()
        this.booksService.addToWishList(this.bookId).subscribe({
            next: data => {
                console.log()
                if (data.success) {
                    this.init()
                }
            },
            error: error => {
                this.sharedService.hideUiCover()
            }
        })
    }

}
