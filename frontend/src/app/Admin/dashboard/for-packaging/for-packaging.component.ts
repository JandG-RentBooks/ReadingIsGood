import { Component } from '@angular/core';
import {DashboardService} from "../../../Services/Admin/dashboard.service";
import {environment} from '../../../../environments/environment';
import {SharedService} from "../../../Services/Admin/shared.service";

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-for-packaging',
  templateUrl: './for-packaging.component.html',
  styleUrls: ['./for-packaging.component.scss']
})
export class ForPackagingComponent {

    mainCollection: any = []
    showDetailsComponent: boolean = false
    selectedItem: any = {}
    stickyFooter: any
    showWorkPanel = false
    newLendingCreatedSuccess = false

    links: any = []
    total: number = 0
    isSearch: boolean = false
    params: { url: string, pages: number[], perPage: number, searchValue: string } = {
        url: `${API_URL}admin/dashboard/for-packaging?page=1`,
        pages: [5, 10, 20, 50],
        perPage: 10,
        searchValue: '',
    }

    constructor(private dashboardService: DashboardService, private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.getLendingsForPackaging()
    }

    paginate(url: string): void {
        this.params.url = url
        this.getLendingsForPackaging()
    }

    perPageOnChange(e: any): void {
        let url = `${API_URL}admin/dashboard/for-packaging?page=1`
        this.paginate(url)
    }

    getLendingsForPackaging(): void {
        this.dashboardService.getActiveLendings(this.params).subscribe({
            next: data => {
                this.mainCollection = data.items.data
                this.links = data.pagination.links
                this.total = data.pagination.total
            },
            error: err => {
                console.log(err)
            }
        })
    }

    openWorkPanel(row: any):void {
        this.selectedItem = row
        this.showWorkPanel = true
    }

    closeWorkPanel(e: any): void {
        this.selectedItem = {}
        this.showWorkPanel = false
    }

    packageIsDone(event: any):void {
        this.getLendingsForPackaging()
        this.selectedItem = {}
        this.showWorkPanel = false
        this.newLendingCreatedSuccess = true
    }
}
