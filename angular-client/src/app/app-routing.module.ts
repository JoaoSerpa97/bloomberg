import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {MediasComponent} from './medias/medias.component';
import {MediaprofileComponent} from './mediaprofile/mediaprofile.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {SearchComponent} from './search/search.component';
import {CreateAuthorNMediaComponent} from './create-author-nmedia/create-author-nmedia.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', component: MediasComponent},
  {path: 'media/:num', component: MediaprofileComponent},
  {path: 'user/:num', component: UserprofileComponent},
  {path: 'search', component: SearchComponent},
  {path: 'manage', component: CreateAuthorNMediaComponent},
  {path: 'login', component: LoginComponent},


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
