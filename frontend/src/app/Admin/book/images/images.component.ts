import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BookService} from "../../../Services/Admin/book.service";
import {SharedService} from "../../../Services/Admin/shared.service";
import {environment} from '../../../../environments/environment';

const API_URL = environment.apiUrl;
const IMAGE_URL = environment.imageUrl;

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent {

    @Output()
    selectImageEventEmitter = new EventEmitter()

    @Output()
    closeImageEventEmitter = new EventEmitter()



    imageUrl = IMAGE_URL
    mainCollection: any = []
    selectedItem: any = {id: null, name: ''}

    isSearch: boolean = false
    searchValue: string = ''

    constructor(private bookService: BookService, private sharedService: SharedService) {
        this.getImages()
    }

    ngOnInit(): void {

    }

    getImages(): void {
        this.bookService.getImages(this.searchValue).subscribe({
            next: data => {
                console.log(data)
                this.mainCollection = data
            },
            error: err => {
            }
        })
    }

    search(): void {
        this.isSearch = true
        this.getImages()
    }

    searchReset(): void {
        this.searchValue = ''
        if (!this.isSearch) {
            return
        }
        this.getImages()
        this.isSearch = false
    }

    selectImage(id: number, path: string): void{
        this.selectImageEventEmitter.emit({id: id, path: path})
    }

    close(): void{
        this.closeImageEventEmitter.emit()
    }

}
