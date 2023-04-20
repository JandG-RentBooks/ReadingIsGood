import { Component } from '@angular/core';
import {DashboardService} from "../../../Services/Admin/dashboard.service";
import {environment} from '../../../../environments/environment';
import {SharedService} from "../../../Services/Admin/shared.service";

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-create-lending',
  templateUrl: './create-lending.component.html',
  styleUrls: ['./create-lending.component.scss']
})
export class CreateLendingComponent {
    mainCollection: any = []
    showDetailsComponent: boolean = false
    selectedItem: any = {id: null, name: ''}
    stickyFooter: any
    showNewPanel = false
    newLendingCreatedSuccess = false
    isDone = false

    links: any = []
    total: number = 0
    isSearch: boolean = false
    params: { url: string, pages: number[], perPage: number, searchValue: string } = {
        url: `${API_URL}admin/dashboard/relevant-users?page=1`,
        pages: [5, 10, 20, 50],
        perPage: 10,
        searchValue: '',
    }

    constructor(private dashboardService: DashboardService, private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.getRelevantUsers()
    }

    paginate(url: string): void {
        this.params.url = url
        this.getRelevantUsers()
    }

    perPageOnChange(e: any): void {
        let url = `${API_URL}admin/dashboard/relevant-users?page=1`
        this.paginate(url)
    }

    getRelevantUsers(): void {
        this.dashboardService.getRelevantUsers(this.params).subscribe({
            next: data => {
                this.mainCollection = data.items.data
                this.links = data.pagination.links
                this.total = data.pagination.total
                this.isDone = true
            },
            error: err => {
                console.log(err)
            }
        })
    }

    openNewPanel(id: number, name: string):void {
        this.selectedItem = {id: id, name: name}
        this.showNewPanel = true
        this.newLendingCreatedSuccess = false
    }

    saveLending(event: any):void {
        this.getRelevantUsers()
        this.selectedItem = {id: null, name: ''}
        this.showNewPanel = false
        this.newLendingCreatedSuccess = true
    }
}
