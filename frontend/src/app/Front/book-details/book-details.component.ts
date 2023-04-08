import {Component, EventEmitter, Input, Output} from '@angular/core';
import {environment} from "../../../environments/environment";

const IMAGE_URL = environment.imageUrl;

@Component({
    selector: 'app-front-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.scss']
})

export class FrontBookDetailsComponent {

    @Input()
    selectedItem: any

    @Output()
    closeEventEmitter = new EventEmitter()

    imageUrl = IMAGE_URL
    imagePath = ''

    labels: string[] = []
    categories: string[] = []

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.selectedItem)
        this.imagePath = this.selectedItem.file_path
        this.labels = this.selectedItem._labels
        this.categories = this.selectedItem._categories
    }

    close(): void {
        this.closeEventEmitter.emit()
    }
}
