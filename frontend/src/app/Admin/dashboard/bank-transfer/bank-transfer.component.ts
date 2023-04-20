import {Component, Inject, ViewChild} from '@angular/core';
import {SharedService} from "../../../Services/Admin/shared.service";
import {DashboardService} from "../../../Services/Admin/dashboard.service";
import {MatExpansionPanel} from "@angular/material/expansion";
import {
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/hu';

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-bank-transfer',
    templateUrl: './bank-transfer.component.html',
    styleUrls: ['./bank-transfer.component.scss'],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'hu-Hu'},
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class BankTransferComponent {

    @ViewChild('searchPanel', {static: true}) matExpansionPanelElement: MatExpansionPanel | undefined

    searchValue = ''
    isSearch: boolean = false
    user: any
    selectedDate: any = null
    showSuccessMessage = false
    isConfirmed = false

    constructor(
        private dashboardService: DashboardService,
        private sharedService: SharedService,
        private _adapter: DateAdapter<any>,
        @Inject(MAT_DATE_LOCALE) private _locale: string,
    ) {
    }

    ngOnInit(): void {
        this._locale = 'hu';
        this._adapter.setLocale(this._locale);
        this.matExpansionPanelElement?.open()
    }

    getUserByPaymentId(): void {
        this.dashboardService.getUserByPaymentId(this.searchValue).subscribe({
            next: data => {
                //console.log(data.user)
                this.isSearch = true
                this.user = data.user
            },
            error: err => {
                console.log(err)
                this.sharedService.hidePostCover()
            }
        })
    }

    search(): void {
        if (this.searchValue.length === 8) {
            this.getUserByPaymentId()
            this.selectedDate = null
        }
    }

    updateLastPaymentDate(): void {
        let date = this.sharedService.transformDate(this.selectedDate._d)

        this.sharedService.showPostCover()
        this.dashboardService.updateLastPaymentDate({userId: this.user.id, date: date}).subscribe({
            next: data => {
                console.log(data)
                if (data.success) {
                    this.sendMail()
                }
            },
            error: err => {
                console.log(err)
                this.sharedService.hidePostCover()
            }
        })
    }

    sendMail(): void {
        this.dashboardService.sendBankTransferEmail({user_id: this.user.id}).subscribe({
            next: data => {
                console.log(data)
                if (data.success) {
                    this.getUserByPaymentId()
                    this.sharedService.hidePostCover()
                    this.showSuccessMessage = true
                    this.selectedDate = null
                    this.searchValue = ''
                    this.isConfirmed = false
                }
            },
            error: err => {
                console.log(err)
                this.sharedService.hidePostCover()
            }
        })
    }
}
