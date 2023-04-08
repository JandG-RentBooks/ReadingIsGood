import { Component } from '@angular/core';
import {IndexService} from "../../Services/Front/index.service";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

    pageContent: any

    constructor(private indexService: IndexService) {
        this.getPageContent()
    }

    getPageContent(): void {
        this.indexService.getPageContent('faq').subscribe({
            next: data => {
                console.log(data)
                this.pageContent = data.item.content
                const container = document.querySelector('.page-content')
                if(container){
                    container.innerHTML = this.pageContent
                }
            },
            error: err => {
            }
        })
    }
}
