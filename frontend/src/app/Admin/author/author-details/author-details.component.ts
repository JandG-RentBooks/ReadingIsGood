import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {

    @Input()
    selectedItem: any

    @Output()
    closeEventEmitter = new EventEmitter()

    constructor() {
    }

    ngOnInit(): void {
    }

    close(): void {
        this.closeEventEmitter.emit()
    }
}
