import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../../Services/Admin/book.service";
import {SharedService} from "../../../Services/Admin/shared.service";
import {environment} from "../../../../environments/environment";

const IMAGE_URL = environment.imageUrl;

@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

    @Input()
    selectedItem: any = {id: null, name: ''}

    @Output()
    closeEventEmitter = new EventEmitter()

    @Output()
    errorEventEmitter = new EventEmitter()

    imageUrl = IMAGE_URL
    imagePath = ''

    constructor(private bookService: BookService, private fb: FormBuilder, private sharedService: SharedService) {
    }

    publisherList: any = []
    authorList: any = []
    languageList: any = []
    coverTypeList: any = []
    labelList: any = []
    categoryList: any = []
    subCategoryList: any = []

    form = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(2)]),
        description: new FormControl('', [Validators.required, Validators.minLength(10)]),
        authors: new FormControl('', [Validators.required]),
        published: new FormControl('', [Validators.required]),
        number_of_page: new FormControl('', [Validators.required]),
        isbn_code: new FormControl('', [Validators.required]),
        in_stock: new FormControl('', [Validators.required]),
        is_new: new FormControl(0),
        language_id: new FormControl('', [Validators.required]),
        cover_type_id: new FormControl('', [Validators.required]),
        publisher_id: new FormControl('', [Validators.required]),
        file_id: new FormControl('', [Validators.required]),
        labels: new FormControl([], [Validators.required]),
        categories: new FormControl([], [Validators.required]),
        mainCategory: new FormControl('', [Validators.required]),
    })

    strAuthor = ''
    strLabels: string[] = []
    strPublisher = ''
    strLanguage = ''
    strCoverType = ''
    strCategories: string[] = []

    showImageComponent: boolean = false

    fillSubCategoriesSet(): void {
        this.subCategoryList = []
        this.categoryList.forEach((item: any) => {
            if (item.id == this.form.value.mainCategory) {
                this.subCategoryList = item.children
            }
        })
    }

    setAuthor(): void {
        this.strAuthor = ''
        for (let i of this.form.value.authors!) {
            this.authorList.forEach((item: any) => {
                if (item.id == i) {
                    this.strAuthor += `${item.name} `
                }
            })
        }
    }

    setLabels(): void {
        this.strLabels = []
        for (let i of this.form.value.labels!) {
            this.labelList.forEach((item: any) => {
                if (item.id == i) {
                    this.strLabels.push(item.name)
                }
            })
        }
    }

    setCategories(): void {
        this.strCategories = []
        for (let i of this.form.value.categories!) {
            this.subCategoryList.forEach((item: any) => {
                if (item.id == i) {
                    this.strCategories.push(item.name)
                }
            })
        }
    }

    setPublisher(): void {
        this.strPublisher = ''
        this.publisherList.forEach((item: any) => {
            if (item.id == this.form.value.publisher_id) {
                this.strPublisher += `${item.name} `
            }
        })
    }

    setLanguage(): void {
        this.strLanguage = ''
        this.languageList.forEach((item: any) => {
            if (item.id == this.form.value.language_id) {
                this.strLanguage += `${item.name} `
            }
        })
    }

    setCoverType(): void {
        this.strCoverType = ''
        this.coverTypeList.forEach((item: any) => {
            if (item.id == this.form.value.cover_type_id) {
                this.strCoverType += `${item.name} `
            }
        })
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.selectedItem.id === null ? this.store() : this.update()
        }
    }

    ngOnInit(): void {
        this.selectedItem.id === null ? this.create() : this.edit()
    }

    fillSelectSets(data: any): void {
        this.publisherList = data.publishers
        this.authorList = data.authors
        this.languageList = data.languages
        this.coverTypeList = data.cover_types
        this.labelList = data.labels
        this.categoryList = data.categories
    }

    create(): void {
        this.bookService.create().subscribe({
            next: data => {
                console.log(data)
                this.fillSelectSets(data)
            },
            error: err => {
            }
        })
    }

    edit(): void {
        this.bookService.edit(this.selectedItem.id).subscribe({
            next: data => {
                console.log(data)
                let tempAuthors: any = []
                let tempLabels: any = []
                let tempCategories: any = []
                let mainCategory = null

                data.item.authors.forEach((item: any) => {
                    tempAuthors.push(item.id)
                })
                data.item.labels.forEach((item: any) => {
                    tempLabels.push(item.id)
                })
                data.item.categories.forEach((item: any) => {
                    if (item.parent_id !== null) {
                        tempCategories.push(item.id)
                    } else {
                        mainCategory = item.id
                    }

                })

                this.imagePath = data.item.file.path

                this.form.patchValue({
                    title: data.item.title,
                    description: data.item.description,
                    published: data.item.published,
                    number_of_page: data.item.number_of_page,
                    isbn_code: data.item.isbn_code,
                    in_stock: data.item.in_stock,
                    is_new: data.item.is_new,
                    language_id: data.item.language_id,
                    cover_type_id: data.item.cover_type_id,
                    publisher_id: data.item.publisher_id,
                    file_id: data.item.file_id,
                    mainCategory: mainCategory,
                })

                this.form.controls['authors'].setValue(tempAuthors)
                this.form.controls['labels'].setValue(tempLabels)
                this.form.controls['categories'].setValue(tempCategories)

                this.fillSelectSets(data)
                this.setAuthor()
                this.setPublisher()
                this.setCoverType()
                this.setLanguage()
                this.setLabels()
                this.fillSubCategoriesSet()
                this.setCategories()
            },
            error: err => {
            }
        })
    }

    store(): void {
        this.sharedService.showPostCover()
        this.bookService.store(this.form.value).subscribe({
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
        this.bookService.update(this.form.value, this.selectedItem.id).subscribe({
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

    openImages(): void {
        this.showImageComponent = true
    }

    selectImages(e: any): void {
        this.showImageComponent = false
        this.imagePath = e.path
        this.form.patchValue({
            file_id: e.id
        })
    }

    closeImages(): void {
        this.showImageComponent = false
    }
}
