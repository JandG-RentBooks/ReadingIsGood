import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../Services/Front/books.service";
import {environment} from '../../../environments/environment';
import {AuthService} from "../../helper/auth.service";
import {ActivatedRoute} from "@angular/router";

const API_URL = environment.apiUrl;
const IMAGE_URL = environment.imageUrl;

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {

    mainCollection: any = []
    categories: any = []
    imageUrl = IMAGE_URL
    links: any = []
    total: number = 0
    isSearch: boolean = false
    isCategorySearch: boolean = false
    params: { url: string, pages: number[], perPage: number, searchValue: string, category: any, userId: any } = {
        url: `${API_URL}books?page=1`,
        pages: [5, 10, 20, 50],
        perPage: 20,
        searchValue: '',
        category: '',
        userId: null,
    }

    wishList: number[] = []
    showWishList = false
    showDetails = false
    selectedItem: any

    constructor(private activatedRoute: ActivatedRoute, private bookService: BooksService, private authService: AuthService) {
        let title
        this.activatedRoute.paramMap.subscribe((params) => {
            title = params.get('title')
        })
        if (title) {
            this.params.searchValue = title
            this.isSearch = true
        }
        this.params.userId = this.authService.getUserId()
        this.index()
        this.getCategories()
    }

    ngOnInit(): void {
        this.showWishList = this.authService.isAuthenticated() && this.authService.isUser()
    }

    paginate(url: string): void {
        this.params.url = url
        this.index()
    }

    perPageOnChange(e: any): void {
        let url = `${API_URL}books?page=1`
        this.paginate(url)
    }

    search(): void {
        this.isSearch = true
        this.perPageOnChange(null)
    }

    searchReset(): void {
        this.params.searchValue = ''
        if (!this.isSearch) {
            return
        }
        this.perPageOnChange(null)
        this.isSearch = false
    }

    searchCategory(catId: any): void {
        this.isCategorySearch = true
        this.searchReset()
        this.params.category = catId
        this.perPageOnChange(null)
    }

    searchCategoryReset(): void {
        this.params.category = ''
        this.perPageOnChange(null)
        this.isCategorySearch = false
    }

    index(): void {
        this.bookService.index(this.params).subscribe({
            next: data => {
                console.log(data)
                this.mainCollection = data.items
                this.links = data.pagination.links
                this.total = data.pagination.total
                this.wishList = data.wishList
            },
            error: err => {
            }
        })
    }

    getCategories(): void {
        this.bookService.getCategories().subscribe({
            next: data => {
                console.log(data)
                this.categories = data.items
            },
            error: err => {
            }
        })
    }



    open(item: any): void {
        this.selectedItem = item
        this.showDetails = true
    }

    close(): void {
        this.showDetails = false
    }


}
