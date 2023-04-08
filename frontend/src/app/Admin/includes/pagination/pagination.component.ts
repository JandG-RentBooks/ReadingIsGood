import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Input()
    links: any

    @Output()
    paginateEventEmitter = new EventEmitter()

    constructor() {
    }

    ngOnInit(): void {
    }

    paginate(url: string): void {
        this.paginateEventEmitter.emit(url)
    }

}
