import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

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
