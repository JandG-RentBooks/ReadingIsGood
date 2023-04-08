import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cover-type-details',
  templateUrl: './cover-type-details.component.html',
  styleUrls: ['./cover-type-details.component.scss']
})
export class CoverTypeDetailsComponent implements OnInit {

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
