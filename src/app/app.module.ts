import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';



import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HeaderComponent } from './components/pages/header/header.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FooterComponent } from './components/pages/footer/footer.component';
import { BannerComponent } from './components/pages/banner/banner.component';
import { ProfileComponent } from './components/website/profile/profile.component';
import { BookingsComponent } from './components/website/bookings/bookings.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ScreeningComponent } from './components/pages/screening/screening.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';

import {MatDialogModule} from '@angular/material/dialog';
import { RegisterComponent } from './components/pages/register/register.component';
import { UpcomingMoviesComponent } from './components/pages/upcoming-movies/upcoming-movies.component';

import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { BookMovieComponent } from './components/pages/book-movie/book-movie.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { TheaterScreenComponent } from './components/pages/theater-screen/theater-screen.component';
import { AuthService } from './components/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MovieDetailsComponent } from './components/pages/movie-details/movie-details.component';
import { SearchProductComponent } from './components/pages/search-product/search-product.component';
import { ConfirmBookDialogueComponent } from './components/pages/confirm-book-dialogue/confirm-book-dialogue.component';
import { tokenInterceptor } from './components/services/token.interceptor';
import { AdminActivityComponent } from './components/admin/admin-activity/admin-activity.component';
import { AboutUsComponent } from './components/website/about-us/about-us.component';
import { SetScreeningDialogueComponent } from './components/admin/set-screening-dialogue/set-screening-dialogue.component';
import { AdminApiHelperService } from './components/services/admin-api-helper.service';
import { TicketDetailsComponent } from './components/website/ticket-details/ticket-details.component';
import { MatAccordion } from '@angular/material/expansion';

import { MatChipsModule } from '@angular/material/chips';
import { ForbiddenComponent } from './components/pages/forbidden/forbidden.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ProfileComponent,
    BookingsComponent,
    LoginComponent,
    ScreeningComponent,
    RegisterComponent,
    UpcomingMoviesComponent,
    BookMovieComponent,
    TheaterScreenComponent,
    MovieDetailsComponent,
    SearchProductComponent,
    ConfirmBookDialogueComponent,
    AdminActivityComponent,
    AboutUsComponent,
    SetScreeningDialogueComponent,
    TicketDetailsComponent,
    ForbiddenComponent,
    PageNotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
   
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
    BrowserAnimationsModule, //primeng 
    InputIconModule,
    IconFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot(), 
    MatCardModule,
    HttpClientModule,
    MatAccordion,   
    MatChipsModule,
   
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: tokenInterceptor,
      multi: true
    },
    AdminApiHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
