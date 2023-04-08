import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-label-details',
  templateUrl: './label-details.component.html',
  styleUrls: ['./label-details.component.scss']
})
export class LabelDetailsComponent implements OnInit {

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
