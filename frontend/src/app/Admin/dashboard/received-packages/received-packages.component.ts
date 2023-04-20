import {Component, Inject, ViewChild} from '@angular/core';
import {DashboardService} from "../../../Services/Admin/dashboard.service";
import {SharedService} from "../../../Services/Admin/shared.service";
import {MatExpansionPanel} from "@angular/material/expansion";

@Component({
    selector: 'app-received-packages',
    templateUrl: './received-packages.component.html',
    styleUrls: ['./received-packages.component.scss']
})
export class ReceivedPackagesComponent {


    @ViewChild('searchPanel', {static: true}) matExpansionPanelElement: MatExpansionPanel | undefined
    @ViewChild('searchQrPanel', {static: true}) matQrExpansionPanelElement: MatExpansionPanel | undefined

    searchValue = ''
    searchValueByType = ''
    QRInput: any
    typedInput: any
    searchPanel: any
    isSearch: boolean = false
    showSuccessMessage = false
    showNotFoundMessage = false
    showCloseErrorMessage = false
    showWorkPanel = false
    selectedItem: any = {}

    constructor(
        private dashboardService: DashboardService,
        private sharedService: SharedService
    ) {
    }

    ngOnInit(): void {
        this.matQrExpansionPanelElement?.open()
        this.matExpansionPanelElement?.open()
        this.setFocus()
    }

    setFocus(): void {
        this.QRInput = document.querySelector('#QRInput')
        if (this.QRInput) {
            this.QRInput.focus()
        }
        this.typedInput = document.querySelector('#typedInput')
        if (this.typedInput) {
            this.matExpansionPanelElement?.close()
        }
    }

    getLandingByShippingToken(): void {
        this.sharedService.showPostCover()
        this.dashboardService.getLandingByShippingToken(this.searchValue).subscribe({
            next: data => {
                this.isSearch = true
                console.log(data.lending)
                if (data.lending) {
                    this.isSearch = true
                    this.selectedItem = data.lending
                    this.openWorkPanel()
                    this.searchPanel = document.querySelector('#searchPanel')
                    if (this.searchPanel) {
                        this.searchPanel.classList.add('d-none')
                    }
                    this.searchValue = ''
                    this.searchValueByType = ''
                } else {
                    this.showNotFoundMessage = true
                }
                this.sharedService.hidePostCover()
            },
            error: err => {
                console.log(err)
                this.sharedService.hidePostCover()
            }
        })
    }

    searchByScan(): void {
        if (this.searchValue.length === 12) {
            this.getLandingByShippingToken()
        }
    }

    search(): void {
        if (this.searchValueByType.length === 12) {
            this.searchValue = this.searchValueByType
            this.getLandingByShippingToken()

        }
    }

    openWorkPanel(): void {
        this.showWorkPanel = true
    }

    closeWorkPanel(e: any): void {
        this.selectedItem = {}
        this.showWorkPanel = false
        if (this.searchPanel.classList.contains('d-none')) {
            this.searchPanel.classList.remove('d-none')
        }
        this.setFocus()
    }

    packageIsDone(event: any): void {
        this.closeLending()
        this.showWorkPanel = false
        if (this.searchPanel.classList.contains('d-none')) {
            this.searchPanel.classList.remove('d-none')
        }
        this.setFocus()
    }

    closeLending(): void {
        this.dashboardService.closeLending(this.selectedItem.id).subscribe({
            next: data => {
                this.selectedItem = {}
                if (data.success) {
                    this.showSuccessMessage = true
                } else {
                    this.showCloseErrorMessage = true
                }
            },
            error: err => {
                this.showCloseErrorMessage = true
            }
        })
    }

}
