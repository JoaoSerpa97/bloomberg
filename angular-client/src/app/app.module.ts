import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MediasComponent } from './medias/medias.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { MediaprofileComponent } from './mediaprofile/mediaprofile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';
import { CreateAuthorNMediaComponent } from './create-author-nmedia/create-author-nmedia.component';
import {FormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {LoginComponent} from './login/login.component';
import {httpInterceptorProviders} from './interceptors';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MediasComponent,
    MediaprofileComponent,
    UserprofileComponent,
    SearchComponent,
    LoginComponent,
    CreateAuthorNMediaComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [CookieService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
