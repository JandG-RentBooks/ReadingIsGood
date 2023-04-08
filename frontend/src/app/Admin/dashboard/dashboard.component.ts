import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {DashboardService} from "../../Services/Admin/dashboard.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    isSidebarOpen = false

    visibilityOptions: any = {
        showFirsPage: true,
        showLendingsPage: false,
        showForPackagingPage: false,
        showBankTransferPage: false,
        showReceivedPackagesPage: false,
        showTestimonialsPage: false,
        showPagesPage: false,
    }

    pageTitle = ''

    @ViewChild('drawer') public drawer: MatDrawer | undefined;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {

    }

    setVisibility(v: string, e: any): void {
        const buttons = document.querySelectorAll('.list-group-item')
        buttons.forEach((btn: any) => {
            if (btn !== null) {
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active')
                }
            }
        })

        e.target.classList.add('active')

        for (let item in this.visibilityOptions) {
            this.visibilityOptions[item] = false
        }
        this.visibilityOptions[v] = true

        this.pageTitle = v === 'showFirsPage' ? '' : e.target.innerText
        this.openSidebar()
    }

    openSidebar(): void {
        const sidebar = document.querySelector('.__dashboard-sidenav')!
        if(this.drawer){
            this.drawer.toggle().then(r => {
                this.isSidebarOpen = sidebar.classList.contains('mat-drawer-opened')
            })
        }
    }

}
