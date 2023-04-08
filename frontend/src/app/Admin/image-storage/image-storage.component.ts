import {Component, OnInit, ViewChild} from '@angular/core';
import {ImageStorageService} from "../../Services/Admin/image-storage.service";
import {SharedService} from "../../Services/Admin/shared.service";
import {environment} from '../../../environments/environment';
import {MatExpansionPanel} from "@angular/material/expansion";

declare var window: any;

const API_URL = environment.apiUrl;
const IMAGE_URL = environment.imageUrl;

@Component({
    selector: 'app-image-storage',
    templateUrl: './image-storage.component.html',
    styleUrls: ['./image-storage.component.scss']
})

export class ImageStorageComponent implements OnInit {

    @ViewChild('imageUploadPanel', {static: true}) matExpansionPanelElement: MatExpansionPanel | undefined

    imageUrl = IMAGE_URL
    mainCollection: any = []
    showFormComponent: boolean = false
    showDetailsComponent: boolean = false
    selectedItem: any = {id: null, name: ''}
    math = Math

    links: any = []
    total: number = 0
    isSearch: boolean = false
    params: { url: string, pages: number[], perPage: number, searchValue: string } = {
        url: `${API_URL}admin/image-storage?page=1`,
        pages: [5, 10, 20, 50],
        perPage: 20,
        searchValue: '',
    }

    formData = new FormData()
    modalDelete: any
    modalError: any
    errors: any
    fileName = ''
    progress = 0
    currentFile?: File
    name: string = ''

    constructor(private imageStorageService: ImageStorageService, private sharedService: SharedService) {
        this.index()
    }

    ngOnInit(): void {
    }

    paginate(url: string): void {
        this.params.url = url
        this.index()
    }

    perPageOnChange(e: any): void {
        console.log(this.params.perPage)
        let url = `${API_URL}admin/image-storage?page=1`
        this.paginate(url)
    }

    search(): void {
        this.isSearch = true
        this.perPageOnChange(null)
    }

    searchReset(): void {
        this.params.searchValue = ''
        if (!this.isSearch) {
            return
        }
        this.perPageOnChange(null)
        this.isSearch = false
    }

    index(): void {
        this.imageStorageService.index(this.params).subscribe({
            next: data => {
                console.log(data)
                this.mainCollection = data.items
                this.links = data.pagination.links
                this.total = data.pagination.total
            },
            error: err => {
            }
        })
    }

    destroy(e: any): void {
        this.modalDelete.toggle()
        this.sharedService.showPostCover()
        this.imageStorageService.destroy(this.selectedItem.id).subscribe({
            next: data => {
                this.sharedService.hidePostCover()
                console.log(data)
                this.perPageOnChange(null)
            },
            error: err => {
                this.sharedService.hidePostCover()
                //this.openErrorModal(err)
            }
        })
    }

    onFileSelected(event: any) {
        if (event.target.files && event.target.files[0]) {
            const file: File = event.target.files[0]
            this.fileName = file.name
            this.currentFile = file;
            this.formData.append("file", file, file.name)
            this.formData.append('name', this.name)
        }
    }

    upload(): void {
        this.sharedService.showPostCover()
        this.imageStorageService.store(this.formData).subscribe({
            next: data => {
                console.log(data)
                this.sharedService.hidePostCover()
                this.matExpansionPanelElement?.close()
                this.fileName = ''
                this.name = ''
                this.perPageOnChange(null)
            },
            error: err => {
                console.log(err)
                this.sharedService.hidePostCover()
                //this.openErrorModal(err)
            }
        })
    }

    openErrorModal(err: any) {
        this.modalError = new window.bootstrap.Modal(document.getElementById('errorModal'))
        let errorText = document.querySelector('.error-text')
        if (errorText) {
            errorText.innerHTML = ''
            console.log(this.sharedService.errorHandler(err))
            errorText.innerHTML = this.sharedService.errorHandler(err)
            this.modalError.toggle()
        }
    }

    openDeleteModal(id: number, name: string): void {
        this.modalDelete = new window.bootstrap.Modal(document.getElementById('itemDeleteModal'))
        this.selectedItem = {id: id, name: name}
        this.modalDelete.toggle()
    }

    closeDeleteModal(): void {
        this.modalDelete = null
    }
}
