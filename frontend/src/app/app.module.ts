import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserComponent} from './Admin/user/user.component';
import {AuthorComponent} from './Admin/author/author.component';
import {BookComponent} from './Admin/book/book.component';
import {CategoryComponent} from './Admin/category/category.component';
import {CoverTypeComponent} from './Admin/cover-type/cover-type.component';
import {LabelComponent} from './Admin/label/label.component';
import {DashboardComponent} from './Admin/dashboard/dashboard.component';
import {IndexComponent} from './index/index.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {FilterComponent} from './Front/filter/filter.component';
import {LoginComponent} from './Front/login/login.component';
import {RegisterComponent} from './Front/register/register.component';
import {TopSectionComponent} from './index/top-section/top-section.component';
import {LastRentedComponent} from './index/last-rented/last-rented.component';
import {TestimonialComponent} from './index/testimonial/testimonial.component';
import {ErrorNotFoundComponent} from './Errors/error-not-found/error-not-found.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {ErrorForbiddenComponent} from './Errors/error-forbidden/error-forbidden.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserFormComponent } from './Admin/user/user-form/user-form.component';
import { UserDetailsComponent } from './Admin/user/user-details/user-details.component';
import { PaginationComponent } from './Admin/includes/pagination/pagination.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ErrorModalComponent } from './Admin/includes/error-modal/error-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormToastComponent } from './Admin/includes/form-toast/form-toast.component';
import { DeleteModalComponent } from './Admin/includes/delete-modal/delete-modal.component';
import { ImageStorageComponent } from './Admin/image-storage/image-storage.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import { LabelDetailsComponent } from './Admin/label/label-details/label-details.component';
import { LabelFormComponent } from './Admin/label/label-form/label-form.component';
import { CoverTypeDetailsComponent } from './Admin/cover-type/cover-type-details/cover-type-details.component';
import { CoverTypeFormComponent } from './Admin/cover-type/cover-type-form/cover-type-form.component';
import { CategoryFormComponent } from './Admin/category/category-form/category-form.component';
import { CategoryDetailsComponent } from './Admin/category/category-details/category-details.component';
import { BookFormComponent } from './Admin/book/book-form/book-form.component';
import { BookDetailsComponent } from './Admin/book/book-details/book-details.component';
import { AuthorDetailsComponent } from './Admin/author/author-details/author-details.component';
import { AuthorFormComponent } from './Admin/author/author-form/author-form.component';
import {CdkAccordionModule} from "@angular/cdk/accordion";
import { PublisherComponent } from './Admin/publisher/publisher.component';
import { PublisherFormComponent } from './Admin/publisher/publisher-form/publisher-form.component';
import { PublisherDetailsComponent } from './Admin/publisher/publisher-details/publisher-details.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ImagesComponent } from './Admin/book/images/images.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { TruncatePipe } from './Pipes/truncate.pipe';
import { SubscriptionTypeComponent } from './Admin/subscription-type/subscription-type.component';
import { SubscriptionTypeFormComponent } from './Admin/subscription-type/subscription-type-form/subscription-type-form.component';
import {AuthInterceptor} from "./auth.interceptor";
import {MatDialogModule} from "@angular/material/dialog";
import {CarouselModule} from "primeng/carousel";
import { ErrorAuthComponent } from './Errors/error-auth/error-auth.component';
import { ErrorAdminComponent } from './Errors/error-admin/error-admin.component';
import { ProfileComponent } from './Front/profile/profile.component';
import { WishListComponent } from './Front/profile/wish-list/wish-list.component';
import { MyCurrentRentComponent } from './Front/profile/my-current-rent/my-current-rent.component';
import { MyRentsComponent } from './Front/profile/my-rents/my-rents.component';
import { MyDataComponent } from './Front/profile/my-data/my-data.component';
import { BooksComponent } from './Front/books/books.component';
import { WishlistComponent } from './Front/books/wishlist/wishlist.component';
import { FrontBookDetailsComponent } from './Front/book-details/book-details.component';
import { ErrorLoginComponent } from './Errors/error-login/error-login.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import { SubscriptionInformationComponent } from './Front/profile/subscription-information/subscription-information.component';
import {CdkDrag, CdkDragPlaceholder, CdkDropList} from "@angular/cdk/drag-drop";
import {MatTabsModule} from "@angular/material/tabs";
import { AddressesComponent } from './Front/profile/addresses/addresses.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { StatCardsComponent } from './Admin/dashboard/stat-cards/stat-cards.component';
import { ActiveLendingsComponent } from './Admin/dashboard/active-lendings/active-lendings.component';
import { BankTransferComponent } from './Admin/dashboard/bank-transfer/bank-transfer.component';
import { ReceivedPackagesComponent } from './Admin/dashboard/received-packages/received-packages.component';
import { ForPackagingComponent } from './Admin/dashboard/for-packaging/for-packaging.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CreateLendingComponent } from './Admin/dashboard/create-lending/create-lending.component';
import { ActiveLendingsDetailsComponent } from './Admin/dashboard/active-lendings-details/active-lendings-details.component';
import { NewLendingPanelComponent } from './Admin/dashboard/create-lending/new-lending-panel/new-lending-panel.component';
import {MatStepperModule} from "@angular/material/stepper";
import { ForPackagingDetailsComponent } from './Admin/dashboard/for-packaging/for-packaging-details/for-packaging-details.component';
import {QRCodeModule} from "angularx-qrcode";
import { ReferencesComponent } from './Front/references/references.component';
import { ContactComponent } from './Front/contact/contact.component';
import { AboutAsComponent } from './Front/about-as/about-as.component';
import { FaqComponent } from './Front/faq/faq.component';
import { HowLendingComponent } from './Front/how-lending/how-lending.component';
import { SubscriptionComponent } from './Front/subscription/subscription.component';
import { NewReferenceComponent } from './Front/references/new-reference/new-reference.component';
import { TestimonialsModerateComponent } from './Admin/dashboard/testimonials-moderate/testimonials-moderate.component';
import { PagesComponent } from './Admin/dashboard/pages/pages.component';
import { NgxEditorModule } from 'ngx-editor';
import { schema } from 'ngx-editor/schema';
import { SystemSettingsComponent } from './Admin/system-settings/system-settings.component';
import {MatBadgeModule} from "@angular/material/badge";

@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        AuthorComponent,
        BookComponent,
        CategoryComponent,
        CoverTypeComponent,
        LabelComponent,
        DashboardComponent,
        IndexComponent,
        FooterComponent,
        HeaderComponent,
        FilterComponent,
        LoginComponent,
        RegisterComponent,
        TopSectionComponent,
        LastRentedComponent,
        TestimonialComponent,
        ErrorNotFoundComponent,
        ErrorForbiddenComponent,
        SidebarComponent,
        UserFormComponent,
        UserDetailsComponent,
        PaginationComponent,
        ErrorModalComponent,
        FormToastComponent,
        DeleteModalComponent,
        ImageStorageComponent,
        LabelDetailsComponent,
        LabelFormComponent,
        CoverTypeDetailsComponent,
        CoverTypeFormComponent,
        CategoryFormComponent,
        CategoryDetailsComponent,
        BookFormComponent,
        BookDetailsComponent,
        AuthorDetailsComponent,
        AuthorFormComponent,
        PublisherComponent,
        PublisherFormComponent,
        PublisherDetailsComponent,
        ImagesComponent,
        TruncatePipe,
        SubscriptionTypeComponent,
        SubscriptionTypeFormComponent,
        ErrorAuthComponent,
        ErrorAdminComponent,
        ProfileComponent,
        WishListComponent,
        MyCurrentRentComponent,
        MyRentsComponent,
        MyDataComponent,
        BooksComponent,
        FrontBookDetailsComponent,
        WishlistComponent,
        ErrorLoginComponent,
        SubscriptionInformationComponent,
        AddressesComponent,
        StatCardsComponent,
        ActiveLendingsComponent,
        BankTransferComponent,
        ReceivedPackagesComponent,
        ForPackagingComponent,
        CreateLendingComponent,
        ActiveLendingsDetailsComponent,
        NewLendingPanelComponent,
        ForPackagingDetailsComponent,
        ReferencesComponent,
        ContactComponent,
        AboutAsComponent,
        FaqComponent,
        HowLendingComponent,
        SubscriptionComponent,
        NewReferenceComponent,
        TestimonialsModerateComponent,
        PagesComponent,
        SystemSettingsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BreadcrumbModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatTooltipModule,
        NgbModule,
        MatExpansionModule,
        MatDividerModule,
        MatToolbarModule,
        MatCardModule,
        CdkAccordionModule,
        MatCheckboxModule,
        MatDialogModule,
        CarouselModule,
        MatMenuModule,
        MatListModule,
        CdkDropList,
        CdkDrag,
        CdkDragPlaceholder,
        MatTabsModule,
        MatSidenavModule,
        MatDatepickerModule,
        MatStepperModule,
        QRCodeModule,
        NgxEditorModule.forRoot({
            locals: {
                // menu
                bold: 'Bold',
                italic: 'Italic',
                code: 'Code',
                blockquote: 'Blockquote',
                underline: 'Underline',
                strike: 'Strike',
                bullet_list: 'Bullet List',
                ordered_list: 'Ordered List',
                heading: 'Heading',
                h1: 'Header 1',
                h2: 'Header 2',
                h3: 'Header 3',
                h4: 'Header 4',
                h5: 'Header 5',
                h6: 'Header 6',
                align_left: 'Left Align',
                align_center: 'Center Align',
                align_right: 'Right Align',
                align_justify: 'Justify',
                text_color: 'Text Color',
                background_color: 'Background Color',

                // popups, forms, others...
                url: 'URL',
                text: 'Text',
                openInNewTab: 'Open in new tab',
                insert: 'Insert',
                altText: 'Alt Text',
                title: 'Title',
                remove: 'Remove',
            },
        }),
        MatBadgeModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
