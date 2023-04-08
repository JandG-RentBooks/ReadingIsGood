import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LabelService} from "../../../Services/Admin/label.service";
import {SharedService} from "../../../Services/Admin/shared.service";

@Component({
  selector: 'app-label-form',
  templateUrl: './label-form.component.html',
  styleUrls: ['./label-form.component.scss']
})
export class LabelFormComponent implements OnInit {

    @Input()
    selectedItem: any = {id: null, name: ''}

    @Output()
    closeEventEmitter = new EventEmitter()

    @Output()
    errorEventEmitter = new EventEmitter()

    constructor(private labelService: LabelService, private sharedService: SharedService) {
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
        this.labelService.create().subscribe({
            next: data => {
                console.log(data)
            },
            error: err => {
            }
        })
    }

    edit(): void {
        this.labelService.edit(this.selectedItem.id).subscribe({
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
        this.labelService.store(this.form.value).subscribe({
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
        this.labelService.update(this.form.value, this.selectedItem.id).subscribe({
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
