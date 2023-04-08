import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../Services/Admin/category.service";
import {SharedService} from "../../Services/Admin/shared.service";
import {environment} from '../../../environments/environment';

declare var window: any;

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements  OnInit {

    mainCollection: any = []
    showFormComponent: boolean = false
    showDetailsComponent: boolean = false
    selectedItem: any = {id: null, name: ''}

    expandedIndex = 0;

    links: any = []
    total: number = 0
    isSearch: boolean = false
    params: { url: string, pages: number[], perPage: number, searchValue: string } = {
        url: `${API_URL}admin/category?page=1`,
        pages: [5, 10, 20, 50],
        perPage: 10,
        searchValue: '',
    }

    modalDelete: any
    modalError: any
    errors: any

    constructor(private categoryService: CategoryService, private sharedService: SharedService) {
        console.log('constructor')
        this.index()
    }


    ngOnInit(): void {
    }

    index(): void {
        this.categoryService.index(this.params).subscribe({
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
        this.categoryService.destroy(this.selectedItem.id).subscribe({
            next: data => {
                this.sharedService.hidePostCover()
                console.log(data)
                this.index()
            },
            error: err => {
                this.sharedService.hidePostCover()
                //this.openErrorModal(err)
            }
        })
    }


    openNew(): void {
        this.selectedItem = {id: null, name: ''}
        this.sharedService.scrollTop()
        this.sharedService.hideScrollbar()
        this.showFormComponent = true
    }

    closeNew(e: any): void {
        this.sharedService.showScrollbar()
        this.showFormComponent = false
        this.selectedItem = {id: null, name: ''}
        if (e) {
            this.index()
        }

    }

    openEdit(id: number, name: string): void {
        this.selectedItem = {id: id, name: name}
        this.sharedService.scrollTop()
        this.sharedService.hideScrollbar()
        this.showFormComponent = true
    }

    openDetails(id: number, name: string): void {
        this.selectedItem = {id: id, name: name}
        this.sharedService.scrollTop()
        this.sharedService.hideScrollbar()
        this.showDetailsComponent = true
    }

    closeDetails(e: any): void {
        this.sharedService.showScrollbar()
        this.showDetailsComponent = false
        this.selectedItem = {id: null, name: ''}
    }

    openErrorModal(err: any) {
        this.modalError = new window.bootstrap.Modal(document.getElementById('errorModal'))
        let errorText = document.querySelector('.error-text')
        if (errorText) {
            errorText.innerHTML = ''
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
