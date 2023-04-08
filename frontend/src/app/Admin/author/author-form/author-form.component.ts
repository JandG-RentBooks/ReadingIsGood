import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorService} from "../../../Services/Admin/author.service";
import {SharedService} from "../../../Services/Admin/shared.service";

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})

export class AuthorFormComponent implements OnInit {

    @Input()
    selectedItem: any = {id: null, name: ''}

    @Output()
    closeEventEmitter = new EventEmitter()

    @Output()
    errorEventEmitter = new EventEmitter()

    constructor(private authorService: AuthorService, private fb: FormBuilder, private sharedService: SharedService) {
    }

    form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        birthday: new FormControl('', [Validators.required])
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
        this.authorService.create().subscribe({
            next: data => {
                console.log(data)
                //this.roleList = data.roles
            },
            error: err => {
            }
        })
    }

    edit(): void {
        this.authorService.edit(this.selectedItem.id).subscribe({
            next: data => {
                console.log(data)
                this.form.patchValue({
                    name: data.name,
                    birthday: data.birthday
                })
            },
            error: err => {
            }
        })
    }

    store(): void {
        this.sharedService.showPostCover()
        this.authorService.store(this.form.value).subscribe({
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
        this.authorService.update(this.form.value, this.selectedItem.id).subscribe({
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
