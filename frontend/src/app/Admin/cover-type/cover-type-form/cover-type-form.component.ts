import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CoverTypeService} from "../../../Services/Admin/cover-type.service";
import {SharedService} from "../../../Services/Admin/shared.service";

@Component({
  selector: 'app-cover-type-form',
  templateUrl: './cover-type-form.component.html',
  styleUrls: ['./cover-type-form.component.scss']
})
export class CoverTypeFormComponent implements OnInit {

    @Input()
    selectedItem: any = {id: null, name: ''}

    @Output()
    closeEventEmitter = new EventEmitter()

    @Output()
    errorEventEmitter = new EventEmitter()

    constructor(private coverTypeService: CoverTypeService, private fb: FormBuilder, private sharedService: SharedService) {
    }

    form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
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
        this.coverTypeService.create().subscribe({
            next: data => {
                console.log(data)
            },
            error: err => {
            }
        })
    }

    edit(): void {
        this.coverTypeService.edit(this.selectedItem.id).subscribe({
            next: data => {
                console.log(data)
                this.form.patchValue({
                    name: data.name
                })
            },
            error: err => {
            }
        })
    }

    store(): void {
        this.sharedService.showPostCover()
        this.coverTypeService.store(this.form.value).subscribe({
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
        this.coverTypeService.update(this.form.value, this.selectedItem.id).subscribe({
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
