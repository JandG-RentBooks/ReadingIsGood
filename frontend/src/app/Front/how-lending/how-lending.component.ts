import { Component } from '@angular/core';
import {IndexService} from "../../Services/Front/index.service";

@Component({
  selector: 'app-how-lending',
  templateUrl: './how-lending.component.html',
  styleUrls: ['./how-lending.component.scss']
})
export class HowLendingComponent {

    pageContent: any

    constructor(private indexService: IndexService) {
        this.getPageContent()
    }

    getPageContent(): void {
        this.indexService.getPageContent('how-lending').subscribe({
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
