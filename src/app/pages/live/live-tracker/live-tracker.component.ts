import {Component, OnInit, ViewChild} from '@angular/core';
import {LiveTrackerService} from '../../../shared/services/live-tracker.service';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../shared/services/api.service';
import {faSync, faHome, faUndo, faBroom} from '@fortawesome/free-solid-svg-icons';
import {timer} from 'rxjs/observable/timer';
import {take, map, last} from 'rxjs/operators';
import * as moment from 'moment';
import 'moment-duration-format';
import {colorSets} from '@swimlane/ngx-charts/release/utils/color-sets';

@Component({
  selector: 'app-player-live-tracker',
  templateUrl: './live-tracker.component.html',
  styleUrls: ['./live-tracker.component.scss']
})
export class LiveTrackerComponent implements OnInit {
  id: string;
  tracker: any;
  trackerDetails: any;
  notFound: boolean;
  syncIcon = faSync;
  homeIcon = faHome;
  resetIcon = faBroom;
  // ngx-charts
  data: any[] = [];
  chartStat = 'kills';

  view: any[] = [700, 400];
  colorSets: any = colorSets;
  showXAxis = true;
  showYAxis = true;
  yMin = 0;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Games';
  showYAxisLabel = true;
  yAxisLabel = 'Kills';
  yScaleMin = 0;

  colorScheme: any;

  // line, area
  autoScale = true;
  // end ngx-charts

  updateInterval = 60 * 10;
  count = this.updateInterval;
  countDown;
  formattedCountdown = moment.utc(this.countDown).format('mm:ss');


  constructor(private liveTrackerService: LiveTrackerService,
              private route: ActivatedRoute,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.colorScheme = this.colorSets.find(s => s.name === 'ocean');
    this.colorScheme.domain.unshift('#2e93b3');
    console.log(this.colorScheme);
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.trackerDetails = this.liveTrackerService.findTrackerDetails(this.id);
      if (this.liveTrackerService.trackerExists(this.id)) {
        this.tracker = this.liveTrackerService.findTracker(this.id);
        this.updateTracker();
      } else {
        this.createTracker();
        this.updateTracker();
      }
    }
    console.log('details', this.trackerDetails);
    console.log('tracker', this.tracker);

    /*this.countDown = timer(0, 10000).pipe(
      take(this.count),
      map(() => --this.count)
    );*/
    this.countDown = timer(0, 1000).pipe(
      map(i => this.updateTimer())
    );
  }

  updateTimer(): number {
    if (this.count > 0) {
      this.count = this.count - 1;
    } else {
      console.log('countdown done!');
      this.updateTracker();
    }
    return this.count;
  }


  updateTracker() {
    console.log('updating tracker details');
    const details = this.liveTrackerService.findTrackerDetails(this.id);
    const playerIds = details.players.map((d) => {
      return d.id;
    }).join(',');
    this.apiService.getPlayersData(playerIds).subscribe((data) => {
      this.tracker = this.liveTrackerService.updateTracker(this.tracker, data, this.id);
      this.getTotals();
      this.updateChart(this.chartStat);
      this.count = this.updateInterval;
      this.trackerDetails = this.liveTrackerService.findTrackerDetails(this.id);
    });
  }

  createTracker() {
    const details = this.liveTrackerService.findTrackerDetails(this.id);
    const playerIds = details.players.map((d) => {
      return d.id;
    }).join(',');
    console.log(playerIds);
    this.apiService.getPlayersData(playerIds).subscribe((players) => {
      if (players) {
        players = this.flattenPlayers(players, details.players);
        this.tracker = this.liveTrackerService.createTracker(this.id, players);
        this.updateTracker();
      }
      // this.updateTracker();
    }, error => console.error('ERROR', error));
  }

  flattenPlayers(data: any, playerIds): any {
    const flat = [];
    data.user.forEach((user) => {
      const userRecord = playerIds.find((p) => {
        return p.id === user.id;
      });
      const player = {
        user: null,
        stats: null,
        rank: null,
        level: null
      };
      player.user = user;
      player.stats = data.stats.find((stats) => {
        if (stats.id === user.id) {
          return stats;
        }
      });
      player.rank = data.rank.find((rank) => {
        if (rank.id === user.id) {
          return rank;
        }
      });
      player.level = data.level.find((level) => {
        if (level.id === user.id) {
          return level;
        }
      });
      flat.push(player);
    });

    return flat;
  }

  resetTacker() {
    this.liveTrackerService.deleteTracker(this.id);
    this.createTracker();
  }

  deleteTracker() {
    this.liveTrackerService.deleteTracker(this.tracker);
    this.tracker = this.liveTrackerService.findTracker(this.id);
  }

  logTracker() {
    console.log(this.tracker);
  }

  getTotals() {
    this.tracker.forEach((track) => {
      track.totals = this.liveTrackerService.getStatTotals(track.games);
    });
  }

  updateChart(stat: string = this.chartStat, statProp = 'general') {
    console.log('updateCharts');

    // ngx-charts
    this.xAxisLabel = 'Games';
    this.yAxisLabel = this.chartStat.charAt(0).toUpperCase() + this.chartStat.substr(1);
    this.data = [];
    this.tracker.forEach((tracks) => {
      const dataPoint = {
        name: tracks.user.name,
        series: []
      };
      let statistic;
      switch (statProp) {
        case 'rank':
          tracks.history.forEach((history, i) => {
            statistic = history.rank.ncsa.mmr;
            dataPoint.series.push({name: (i).toString(), value: statistic});
          });
          this.yMin = null;
          break;
        default:
          tracks.games.forEach((game, i) => {
            statistic = game.stats.general;
            dataPoint.series.push({name: (i + 1).toString(), value: statistic[stat]});
          });
          this.yMin = 0;
      }
      this.data = [...this.data, dataPoint];
    });
    this.getYScaleMin();
  }

  axisFormat(val) {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }

  getYScaleMin() {
    if (['kills', 'deaths', 'assists'].includes(this.chartStat)) {
      this.yScaleMin = 0;
      this.autoScale = false;
    } else {
      this.yScaleMin = null;
      this.autoScale = true;
    }
    console.log('yMin', this.yScaleMin);
  }

  round(val): number {
    return Math.round(val);
  }

  switchChartStat(stat: string, statProp: string = 'general') {
    this.chartStat = stat;
    this.updateChart(this.chartStat, statProp);
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  onSelect(e: any): void {
    console.log(e);
  }

}
