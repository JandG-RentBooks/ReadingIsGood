import { Component } from '@angular/core';
import {IndexService} from "../../Services/Front/index.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

    pageContent: any

    constructor(private indexService: IndexService) {
        //this.getPageContent()
    }

    getPageContent(): void {
        this.indexService.getPageContent('contact').subscribe({
            next: data => {
                console.log(data)
                this.pageContent = data.item.content
            },
            error: err => {
            }
        })
    }
}
