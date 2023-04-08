import {Component, OnInit} from '@angular/core';
import {CarouselModule} from 'primeng/carousel';
import {IndexService} from "../../Services/Front/index.service";
import {environment} from "../../../environments/environment";

const IMAGE_URL = environment.imageUrl;

@Component({
    selector: 'app-last-rented',
    templateUrl: './last-rented.component.html',
    styleUrls: ['./last-rented.component.scss']
})
export class LastRentedComponent implements OnInit {

    books: any = []
    imageUrl = IMAGE_URL
    responsiveOptions: any

    constructor(private indexService: IndexService) {
        this.responsiveOptions = [
            {
                breakpoint: '1300px',
                numVisible: 3,
                numScroll: 2
            },
            {
                breakpoint: '1024px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    ngOnInit(): void {
        this.getBooks()
    }

    getBooks(): any {
        this.indexService.getBooks().subscribe({
            next: data => {
                console.log(data)
                this.books = data
            },
            error: err => {
            }
        })
    }

}
