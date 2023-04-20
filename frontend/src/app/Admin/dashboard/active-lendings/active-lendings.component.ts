import {Component} from '@angular/core';
import {DashboardService} from "../../../Services/Admin/dashboard.service";
import {environment} from '../../../../environments/environment';
import {SharedService} from "../../../Services/Admin/shared.service";

const API_URL = environment.apiUrl;

@Component({
    selector: 'app-active-lendings',
    templateUrl: './active-lendings.component.html',
    styleUrls: ['./active-lendings.component.scss']
})
export class ActiveLendingsComponent {

    mainCollection: any = []
    showDetailsComponent: boolean = false
    selectedItem: any = {id: null, name: ''}
    stickyFooter: any
    isDone = false

    links: any = []
    total: number = 0
    isSearch: boolean = false
    params: { url: string, pages: number[], perPage: number, searchValue: string } = {
        url: `${API_URL}admin/dashboard/active-lendings?page=1`,
        pages: [5, 10, 20, 50],
        perPage: 10,
        searchValue: '',
    }

    constructor(private dashboardService: DashboardService, private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.getActiveLendings()
    }

    paginate(url: string): void {
        this.params.url = url
        this.getActiveLendings()
    }

    perPageOnChange(e: any): void {
        let url = `${API_URL}admin/dashboard/active-lendings?page=1`
        this.paginate(url)
    }

    getActiveLendings(): void {
        this.dashboardService.getActiveLendings(this.params).subscribe({
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

    openDetails(id: number, name: string): void {
        this.stickyFooter = document.querySelector('.sticky-footer')
        this.selectedItem = {id: id, name: name}
        this.sharedService.scrollTop()
        //this.sharedService.hideScrollbar()
        this.showDetailsComponent = true
        this.stickyFooter.classList.add('d-none')
    }

    closeDetails(e: any): void {
        //this.sharedService.showScrollbar()
        this.showDetailsComponent = false
        this.selectedItem = {id: null, name: ''}
        if (this.stickyFooter.classList.contains('d-none')) {
            this.stickyFooter.classList.remove('d-none')
        }
    }
}
