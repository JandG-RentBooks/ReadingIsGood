import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SubscriptionTypeService} from "../../../Services/Admin/subscription-type.service";
import {SharedService} from "../../../Services/Admin/shared.service";

@Component({
  selector: 'app-subscription-type-form',
  templateUrl: './subscription-type-form.component.html',
  styleUrls: ['./subscription-type-form.component.scss']
})
export class SubscriptionTypeFormComponent {

    @Input()
    selectedItem: any = {id: null, name: ''}

    @Output()
    closeEventEmitter = new EventEmitter()

    @Output()
    errorEventEmitter = new EventEmitter()

    constructor(private subscriptionTypeService: SubscriptionTypeService, private sharedService: SharedService) {
    }

    form = new FormGroup({
        book_number: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
    })


    onSubmit(): void {
        if (this.form.valid) {
            this.selectedItem.id === null ? this.store() : this.update()
        }
    }

    ngOnInit(): void {
        this.selectedItem.id === null ? this.create() : this.edit()
    }

    create(): void {
        this.subscriptionTypeService.create().subscribe({
            next: data => {
                console.log(data)
            },
            error: err => {
            }
        })
    }

    edit(): void {
        this.subscriptionTypeService.edit(this.selectedItem.id).subscribe({
            next: data => {
                console.log(data)
                this.form.patchValue({
                    book_number: data.book_number,
                    description: data.description,
                    price: data.price,
                })
            },
            error: err => {
            }
        })
    }

    store(): void {
        this.sharedService.showPostCover()
        this.subscriptionTypeService.store(this.form.value).subscribe({
            next: data => {
                this.sharedService.hidePostCover()
                if (data.success) {
                    this.close(true)
                    // @ts-ignore
                    document.querySelector('.toast_-body').innerHTML = this.sharedService.texts.msg_creation_success
                    this.sharedService.openToast('SaveSuccessToast')
                } else {
                    this.setError(data)
                }
            },
            error: err => {
                this.sharedService.hidePostCover()
                this.setError(err)
            }
        })
    }

    update(): void {
        this.sharedService.showPostCover()
        this.subscriptionTypeService.update(this.form.value, this.selectedItem.id).subscribe({
            next: data => {
                this.sharedService.hidePostCover()
                if (data.success) {
                    this.close(true)
                    // @ts-ignore
                    document.querySelector('.toast_-body').innerHTML = this.sharedService.texts.msg_update_success
                    this.sharedService.openToast('SaveSuccessToast')
                } else {
                    this.setError(data)
                }
            },
            error: err => {
                this.sharedService.hidePostCover()
                this.setError(err)
            }
        })
    }

    close(state: boolean = false): void {
        this.closeEventEmitter.emit(state)
    }

    setError(err: any) {
        //this.errorEventEmitter.emit(err)
    }
}
