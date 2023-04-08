import {Component, Inject, ViewChild} from '@angular/core';
import {DashboardService} from "../../../Services/Admin/dashboard.service";
import {SharedService} from "../../../Services/Admin/shared.service";
import {MatExpansionPanel} from "@angular/material/expansion";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";

@Component({
  selector: 'app-received-packages',
  templateUrl: './received-packages.component.html',
  styleUrls: ['./received-packages.component.scss']
})
export class ReceivedPackagesComponent {


    @ViewChild('searchPanel', {static: true}) matExpansionPanelElement: MatExpansionPanel | undefined

    searchValue = ''
    isSearch: boolean = false
    lending: any
    showSuccessMessage = false

    constructor(
        private dashboardService: DashboardService,
        private sharedService: SharedService
    ) {
    }

    ngOnInit(): void {
        this.matExpansionPanelElement?.open()
    }

    getLandingByShippingToken(): void {
        this.dashboardService.getLandingByShippingToken(this.searchValue).subscribe({
            next: data => {
                //console.log(data.user)
                this.isSearch = true
                this.lending = data.lending
            },
            error: err => {
                console.log(err)
                this.sharedService.hidePostCover()
            }
        })
    }

    search(): void {
        if (this.searchValue.length === 12) {
            this.getLandingByShippingToken()
            
        }
    }

}
