import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {DashboardService} from "../../Services/Admin/dashboard.service";
import {SharedService} from "../../Services/Admin/shared.service";

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

    timerIsRun = false
    forPackagesNum = 0
    testimonialsCommentNum = 0

    @ViewChild('drawer') public drawer: MatDrawer | undefined;
    @ViewChild('showForPackagingPage') public showForPackagingPage: ElementRef | undefined;
    @ViewChild('showTestimonialsPage') public showTestimonialsPage: ElementRef | undefined;

    constructor(private dashboardService: DashboardService, private sharedService: SharedService) {
        this.timerIsRun = true
        this.timer()
    }

    ngOnInit(): void {}

    setPage(v: string): void {
        switch (v) {
            case 'showForPackagingPage':
                if (this.showForPackagingPage) {
                    this.showForPackagingPage.nativeElement.click()
                }
                break

            case 'showTestimonialsPage':
                if (this.showTestimonialsPage) {
                    this.showTestimonialsPage.nativeElement.click()
                }
                break
        }
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
        if (this.isSidebarOpen) {
            this.openSidebar()
        }

    }

    openSidebar(): void {
        const sidebar = document.querySelector('.__dashboard-sidenav')!
        if (this.drawer) {
            this.drawer.toggle().then(r => {
                this.isSidebarOpen = sidebar.classList.contains('mat-drawer-opened')
            })
        }
    }

    getBadgeData(): void {
        this.dashboardService.getBadgeData().subscribe({
            next: data => {
                this.forPackagesNum = data.forPackagesNum
                this.testimonialsCommentNum = data.testimonialsCommentNum
            },
            error: err => {

            }
        })
    }

    timer(): void {
        if (this.timerIsRun) {
            this.getBadgeData()
            this.sharedService.sleep(60000).then(() => {
                    this.timer()
                }
            )
        }
    }

}
