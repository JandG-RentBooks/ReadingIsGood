import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SharedService} from "../../Services/Admin/shared.service";

@Component({
    selector: 'app-error-admin',
    templateUrl: './error-admin.component.html',
    styleUrls: ['./error-admin.component.scss'],
})
export class ErrorAdminComponent {

    errorList: any = []

    constructor(@Inject(MAT_DIALOG_DATA) public data: { error: any },
                private sharedService: SharedService) {
        this.parseErrors(data.error)
    }

    parseErrors(data: any): void {
        const errors: String[] = Object.values(data.error.errors)
        if(data.status === 500){
            this.errorList.push(`${this.sharedService.texts.error_message}`)
            return
        }
        if(errors.length){
            for (let i in errors) {
                this.errorList.push(`${errors[i][0]}`)
            }
        }

    }
}
