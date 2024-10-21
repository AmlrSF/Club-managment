import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { NewPostComponent } from './new-post/new-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewPostComponent,
    PostDetailsComponent
   
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    ReactiveFormsModule
  ]
})
export class PostModule { }
