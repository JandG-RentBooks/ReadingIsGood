import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnChanges, OnInit {

    @Input()
    name: string | undefined

    @Output()
    deleteEventEmitter = new EventEmitter()

    @Output()
    closeEventEmitter = new EventEmitter()

    constructor() {
    }

    strName: string | undefined

    ngOnChanges() {
        this.strName = this.name
        console.log(this.name)
    }

    ngOnInit(): void {
    }

    deleteItem(): void {
        this.deleteEventEmitter.emit()
    }

    close(): void {
        this.closeEventEmitter.emit()
        //this.strName = undefined
        console.log('close')
    }
}
