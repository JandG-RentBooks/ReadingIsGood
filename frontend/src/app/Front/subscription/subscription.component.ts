import { Component } from '@angular/core';
import {IndexService} from "../../Services/Front/index.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {

    pageContent: any

    constructor(private indexService: IndexService) {
        this.getPageContent()
    }

    getPageContent(): void {
        this.indexService.getPageContent('subscription').subscribe({
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
