import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
import { CommentsItemComponent } from './comments/comments-item/comments-item.component';
import { LoadingComponent } from './loading/loading.component';
import { FilterListPipe } from './pipes/filter.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { BallsDisplayComponent } from './balls-display/balls-display.component';


@NgModule({
    declarations: [
        BreadcrumbComponent,
        CommentsComponent,
        CommentsItemComponent,
        LoadingComponent,
        FilterListPipe,
        SafeUrlPipe,
        PaginationComponent,
        BallsDisplayComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        BreadcrumbComponent,
        FormsModule,
        CommentsComponent,
        CommentsItemComponent,
        ReactiveFormsModule,
        LoadingComponent,
        FilterListPipe,
        SafeUrlPipe,
        PaginationComponent,
        BallsDisplayComponent
    ]
})
export class SharedModule {}
