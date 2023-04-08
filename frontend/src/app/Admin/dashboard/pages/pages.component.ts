import {Component} from '@angular/core';
import {DashboardService} from "../../../Services/Admin/dashboard.service";
import {Editor, Toolbar} from 'ngx-editor';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../../Services/Admin/shared.service";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

    editor: any
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];
    reference = ''
    pageContent = ''
    id: any = null
    showSuccessMessage = false

    form = new FormGroup({
        pageContent: new FormControl('', [Validators.required]),
    });

    constructor(private dashboardService: DashboardService, private sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.editor = new Editor();
    }

    ngOnDestroy(): void {
        if (this.editor) {
            this.editor.destroy();
        }

    }

    setReference(v: string): void {
        this.reference = v
        this.getPageContent()
    }

    getPageContent(): void {
        this.dashboardService.getPageContent(this.reference).subscribe({
            next: data => {
                console.log(data)
                this.pageContent = data.item.content
                this.id = data.item.id
            },
            error: err => {
            }
        })
    }

    updatePageContent(): void {
        this.sharedService.showPostCover()
        this.dashboardService.updatePageContent(this.id, this.form.value.pageContent).subscribe({
            next: data => {
                if(data.success){
                    this.showSuccessMessage = true
                }
                this.sharedService.hidePostCover()
            },
            error: err => {
                this.sharedService.hidePostCover()
            }
        })
    }


}
