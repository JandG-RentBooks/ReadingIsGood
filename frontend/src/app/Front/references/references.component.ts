import { Component } from '@angular/core';
import {IndexService} from "../../Services/Front/index.service";
import {environment} from '../../../environments/environment';
import {AuthService} from "../../helper/auth.service";

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent {

    mainCollection: any = []
    links: any = []
    total: number = 0
    params: { url: string, pages: number[], perPage: number} = {
        url: `${API_URL}references?page=1`,
        pages: [5, 10, 20, 50],
        perPage: 10,
    }

    showNewComment = false
    showNewCommentButton = false

    constructor(private indexService: IndexService, private authService: AuthService) {
        this.index()
    }

    ngOnInit(): void {
        this.showNewCommentButton = this.authService.isAuthenticated() && this.authService.isUser()
    }

    paginate(url: string): void {
        this.params.url = url
        this.index()
    }

    perPageOnChange(e: any): void {
        let url = `${API_URL}references?page=1`
        this.paginate(url)
    }

    index(): void {
        this.indexService.getReferences(this.params).subscribe({
            next: data => {
                console.log(data)
                this.mainCollection = data.items.data
                this.links = data.pagination.links
                this.total = data.pagination.total
            },
            error: err => {
            }
        })
    }

    openNewReference():void {
        this.showNewComment = !this.showNewComment;
        if(!this.showNewComment){
            this.index()
        }
    }
}
