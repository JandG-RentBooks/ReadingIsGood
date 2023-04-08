import { Component } from '@angular/core';
import {IndexService} from "../../Services/Front/index.service";

@Component({
  selector: 'app-about-as',
  templateUrl: './about-as.component.html',
  styleUrls: ['./about-as.component.scss']
})
export class AboutAsComponent {

    pageContent: any

    constructor(private indexService: IndexService) {
        this.getPageContent()
    }

    getPageContent(): void {
        this.indexService.getPageContent('about-as').subscribe({
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
