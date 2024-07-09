import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminActivityComponent } from './components/admin/admin-activity/admin-activity.component';
import { adminGuard } from './components/guards/admin.guard';
import { authGuard } from './components/guards/auth.guard';
import { BookMovieComponent } from './components/pages/book-movie/book-movie.component';
import { ForbiddenComponent } from './components/pages/forbidden/forbidden.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MovieDetailsComponent } from './components/pages/movie-details/movie-details.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ScreeningComponent } from './components/pages/screening/screening.component';
import { SearchProductComponent } from './components/pages/search-product/search-product.component';
import { UpcomingMoviesComponent } from './components/pages/upcoming-movies/upcoming-movies.component';
import { AboutUsComponent } from './components/website/about-us/about-us.component';
import { BookingsComponent } from './components/website/bookings/bookings.component';
import { ProfileComponent } from './components/website/profile/profile.component';
import { TicketDetailsComponent } from './components/website/ticket-details/ticket-details.component';

const routes: Routes = [
  {
    path:'',
    component:ScreeningComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'booking',
    component:TicketDetailsComponent,
    canActivate:[authGuard]
    // component:BookingsComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'allUpcomingMovies',
    component:UpcomingMoviesComponent
  },
  {
    path:'bookNow/:auditoriumId',
    component:BookMovieComponent,
    canActivate:[authGuard]
  },
  {
    path:'movieDetails/:movieId',
    component:MovieDetailsComponent
  },
  {    path:'search/movie/:searchString',
      component:SearchProductComponent
  },
  {    path:'aboutUs',
      component:AboutUsComponent
  },
  {
    path:'adminActivity',
    component:AdminActivityComponent,
    canActivate:[adminGuard]
  },
  {
    path:'forbidden',
    component:ForbiddenComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
