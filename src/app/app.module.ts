import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlayerComponent} from './pages/player/player.component';
import {HeaderComponent} from './pages/player/header/header.component';
import {StatsComponent} from './pages/player/stats/stats.component';
import {OperatorsComponent} from './pages/player/operators/operators.component';
import {RanksComponent} from './pages/player/ranks/ranks.component';
import {HomeComponent} from './pages/home/home.component';
import {ApiService} from './shared/services/api.service';
import {HttpClientModule} from '@angular/common/http';
import { RankComponent } from './pages/player/stats/rank/rank.component';
import { PreviousRanksComponent } from './pages/player/stats/previous-ranks/previous-ranks.component';
import { GeneralComponent } from './pages/player/stats/general/general.component';
import { QueueComponent } from './pages/player/stats/queue/queue.component';
import { ModesComponent } from './pages/player/stats/modes/modes.component';
import { PastRanksComponent } from './pages/player/stats/past-ranks/past-ranks.component';
import { SeasonRankComponent } from './pages/player/stats/rank/season-rank/season-rank.component';
import { OperatorComponent } from './pages/player/operators/operator/operator.component';
import { NameFilterPipe } from './shared/pipes/name-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    HeaderComponent,
    StatsComponent,
    OperatorsComponent,
    RanksComponent,
    HomeComponent,
    RankComponent,
    PreviousRanksComponent,
    GeneralComponent,
    QueueComponent,
    ModesComponent,
    PastRanksComponent,
    SeasonRankComponent,
    OperatorComponent,
    NameFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
