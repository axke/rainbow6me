import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ChartsModule} from 'ng2-charts';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlayerComponent} from './pages/player/player.component';
import {HeaderComponent} from './pages/player/header/header.component';
import {StatsComponent} from './pages/player/stats/stats.component';
import {OperatorsComponent} from './pages/player/operators/operators.component';
import {HomeComponent} from './pages/home/home.component';
import {ApiService} from './shared/services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {RankComponent} from './pages/player/stats/rank/rank.component';
import {PreviousRanksComponent} from './pages/player/stats/previous-ranks/previous-ranks.component';
import {GeneralComponent} from './pages/player/stats/general/general.component';
import {QueueComponent} from './pages/player/stats/queue/queue.component';
import {SeasonRankComponent} from './pages/player/stats/rank/season-rank/season-rank.component';
import {OperatorComponent} from './pages/player/operators/operator/operator.component';
import {NameFilterPipe} from './shared/pipes/name-filter.pipe';
import {SearchComponent} from './pages/search/search.component';
import {ResultsComponent} from './pages/search/results/results.component';
import {OrderPipe} from './shared/pipes/order.pipe';
import {LiveTrackerComponent} from './pages/live/live-tracker/live-tracker.component';
import {LiveTrackerService} from './shared/services/live-tracker.service';
import {LiveComponent} from './pages/live/live.component';
import {CreateTrackerComponent} from './pages/live/create-tracker/create-tracker.component';
import {FormsModule} from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FavoritesComponent} from './pages/favorites/favorites.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {FavoritesService} from './shared/services/favorites.service';
import {ModesComponent } from './pages/player/stats/modes/modes.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LobbyComponent } from './pages/search/lobby/lobby.component';
import { StatComponent } from './pages/player/stats/general/stat/stat.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    HeaderComponent,
    StatsComponent,
    OperatorsComponent,
    HomeComponent,
    RankComponent,
    PreviousRanksComponent,
    GeneralComponent,
    QueueComponent,
    SeasonRankComponent,
    OperatorComponent,
    NameFilterPipe,
    SearchComponent,
    ResultsComponent,
    OrderPipe,
    LiveTrackerComponent,
    LiveComponent,
    CreateTrackerComponent,
    FavoritesComponent,
    NavbarComponent,
    ModesComponent,
    FooterComponent,
    LobbyComponent,
    StatComponent,
  ],
  entryComponents: [
    CreateTrackerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    FontAwesomeModule,
    NgxChartsModule,
    ChartsModule
  ],
  providers: [
    ApiService,
    LiveTrackerService,
    FavoritesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
