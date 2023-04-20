import { Component } from '@angular/core';
import {IndexService} from "../../Services/Front/index.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

    data: any

    constructor(private indexService: IndexService) {
        this.getContactData()
    }

    getContactData(): void {
        this.indexService.getContactData().subscribe({
            next: data => {
                console.log(data)
                this.data = data
            },
            error: err => {
            }
        })
    }
}
