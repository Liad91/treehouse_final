import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';

import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SocialProfileComponent } from './profile/social-profile/social-profile.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavComponent,
    ProfileComponent,
    SearchComponent,
    SocialProfileComponent,
    FileDropDirective,
    FileSelectDirective
  ],
  entryComponents: [
    ProfileComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    NavComponent,
    ProfileComponent,
    SearchComponent,
    SocialProfileComponent
  ],
  providers: []
})
export class ComponentsModule { }