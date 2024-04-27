import { Routes } from '@angular/router';
import { HomePageComponent } from '../public/components/home-page/home-page.component';
import { MovieTableComponent } from '../movies/components/movie-table/movie-table.component';
export const routes: Routes = [
    {path: 'home', component: HomePageComponent},
    {path: 'business/peliculas', component: MovieTableComponent}
];
