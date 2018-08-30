import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlayerComponent} from './pages/player/player.component';
import {HomeComponent} from './pages/home/home.component';
import {OperatorsComponent} from './pages/player/operators/operators.component';
import {SearchComponent} from './pages/search/search.component';
import {ResultsComponent} from './pages/search/results/results.component';
import {LiveComponent} from './pages/live/live.component';
import {LiveTrackerComponent} from './pages/live/live-tracker/live-tracker.component';
import {FavoritesComponent} from './pages/favorites/favorites.component';

const routes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'player/:id', component: PlayerComponent},
  {path: 'player/:id/:tab', component: PlayerComponent},
  {path: 'live', component: LiveComponent},
  {path: 'live/:id', component: LiveTrackerComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:name', component: ResultsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
