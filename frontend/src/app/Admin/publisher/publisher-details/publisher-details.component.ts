import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.scss']
})
export class PublisherDetailsComponent {

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
