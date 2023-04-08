import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../Services/Admin/user.service";
import {SharedService} from "../../../Services/Admin/shared.service";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

    @Input()
    selectedItem: any = {id: null, name: ''}

    @Output()
    closeEventEmitter = new EventEmitter()

    @Output()
    errorEventEmitter = new EventEmitter()


    constructor(private userService: UserService, private sharedService: SharedService) {
    }

    roleList: any = []
    statusList: any = [
        {id: 1, name: 'Aktív'},
        {id: 0, name: 'Inaktív'},
    ]

    form = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        address: new FormControl(''),
        phone_number: new FormControl(''),
        role: new FormControl('', [Validators.required]),
        isActive: new FormControl(1, [Validators.required]),
    })

    onSubmit(): void {
        if (this.form.valid) {
            this.selectedItem.id === null ? this.store() : this.update()
        }
    }

    ngOnInit(): void {
        if (this.selectedItem.id === null) {
            // @ts-ignore
            this.form.addControl('password', new FormControl('', [Validators.required]))
            this.create()
        } else {
            // @ts-ignore
            this.form.addControl('password', new FormControl(''))
            this.edit()
        }
    }

    create(): void {
        this.userService.create().subscribe({
            next: data => {
                console.log(data)
                this.roleList = data.roles
            },
            error: err => {
            }
        })
    }

    edit(): void {
        this.userService.edit(this.selectedItem.id).subscribe({
            next: data => {
                console.log(data)
                this.form.patchValue({
                    username: data.user[0].username,
                    name: data.user[0].name,
                    email: data.user[0].email,
                    address: data.user[0].address,
                    phone_number: data.user[0].phone_number,
                    isActive: data.user[0].is_active,
                    role: data.user[0].roles[0].id
                })
                this.roleList = data.roles
            },
            error: err => {
            }
        })
    }

    store(): void {
        this.sharedService.showPostCover()
        this.userService.store(this.form.value).subscribe({
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
        this.userService.update(this.form.value, this.selectedItem.id).subscribe({
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
