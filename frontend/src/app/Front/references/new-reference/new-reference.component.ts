import {Component, EventEmitter, Output} from '@angular/core';
import {SharedService} from "../../../Services/Admin/shared.service";
import {IndexService} from "../../../Services/Front/index.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../../Services/Admin/book.service";

@Component({
  selector: 'app-new-reference',
  templateUrl: './new-reference.component.html',
  styleUrls: ['./new-reference.component.scss']
})
export class NewReferenceComponent {

    @Output()
    closeEventEmitter = new EventEmitter()

    constructor(private indexService: IndexService, private fb: FormBuilder, private sharedService: SharedService) {
    }

    ratingList: any = [
        {key: 1, value: 'Elégedetlen vagyok minden téren'},
        {key: 2, value: 'Azért lenne min javítani!'},
        {key: 3, value: 'Közepesre értékelem'},
        {key: 4, value: 'Többségében elégedett vagyok'},
        {key: 5, value: 'Minden tökéletes'},
    ]

    rating: any

    form = new FormGroup({
        description: new FormControl('', [Validators.required, Validators.minLength(20)]),
        rating: new FormControl('', [Validators.required])
    })

    setRating(): void {
        this.rating = this.form.value.rating
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.storeReference()
        }
    }

    storeReference(): void {
        this.sharedService.showPostCover()
        this.indexService.storeReference(this.form.value).subscribe({
            next: data => {
                this.sharedService.hidePostCover()
                if (data.success) {
                    this.close()
                }
            },
            error: err => {
                this.sharedService.hidePostCover()
            }
        })
    }

    close(): void {
        this.closeEventEmitter.emit()
    }
}
