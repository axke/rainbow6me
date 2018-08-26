import {Component, OnInit, ViewChild} from '@angular/core';
import {LiveTrackerService} from '../../../shared/services/live-tracker.service';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../shared/services/api.service';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-player-live-tracker',
  templateUrl: './live-tracker.component.html',
  styleUrls: ['./live-tracker.component.scss']
})
export class LiveTrackerComponent implements OnInit {
  id: string;
  tracker: any;
  notFound: boolean;
  @ViewChild('lineChart') chart: BaseChartDirective;
  chartStat = 'kills';
  chartData: any[] = [];
  chartLabels: string[] = [];
  chartOptions: any = {
    scales: {
      yAxes: [{
        display: true, labelString: 'sup', ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        display: true, labelString: 'nah', ticks: {
          beginAtZero: true
        }
      }]
    },
    responsive: true
  };
  chartColors: any[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  chartLegend = true;
  chartType = 'line';


  constructor(private liveTrackerService: LiveTrackerService,
              private route: ActivatedRoute,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      if (this.liveTrackerService.trackerExists(this.id)) {
        this.tracker = this.liveTrackerService.findTracker(this.id);
        this.updateTracker();
      } else {
        this.createTracker();
        this.updateTracker();
      }
    }
    console.log('tracker', this.tracker);
  }

  search(name: string) {
    this.apiService.getUserByName(name).subscribe(
      (users) => {
        if (users.length === 1) {
          this.apiService.getPlayer(users[0].id).subscribe((player) => {
            console.log('pre add', this.tracker);
            this.tracker = this.liveTrackerService.addPlayerToTracker(this.id, this.tracker, player);
            console.log('tracker after add', this.tracker);
            this.notFound = false;
          }, error => {
            console.error('ERROR:', error);
            this.notFound = true;
          });
        } else {
          this.notFound = true;
        }
      },
      error => {
        console.error('ERROR:', error);
        this.notFound = true;
      }
    );
  }

  updateTracker() {
    this.tracker = this.liveTrackerService.findTracker(this.id);
    const playersToUpdate = [];
    this.tracker.forEach((player) => {
      playersToUpdate.push(player.user.id);
    });
    this.apiService.getPlayersData(playersToUpdate.toString()).subscribe((data) => {
      this.tracker = this.liveTrackerService.updateTracker(this.tracker, data, this.id);
      this.getTotals();
      this.updateChart('kills');
    });
  }

  createTracker() {
    console.log('need to make a new tracker based on the player', this.id);
    this.apiService.getPlayer(this.id).subscribe((player) => {
      this.tracker = this.liveTrackerService.createTracker(this.id, player);
      this.updateTracker();
    }, error => {
      console.error('ERROR:', error);
    });
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

  updateChart(stat: string) {
    console.log('updateCharts');
    this.chartData = [];
    this.chartLabels = [];
    this.chartStat = stat;
    this.tracker.forEach((tracks) => {
      const userStats = {data: [], label: `${tracks.user.name}`};
      tracks.games.forEach((game, i) => {
        if (i > 0) {
          userStats.data.push(game.stats.general[stat]);
        }
      });
      this.chartData.push(userStats);
    });
    for (let i = 0; i < this.tracker[0].games.length; i++) {
        this.chartLabels.push((i + 1).toString());
    }
    this.chartData = Object.assign( [], this.chartData);
    this.chartLabels = Object.assign( [], this.chartLabels);
    if (this.chart !== undefined) {
      this.chart.ngOnDestroy();
      this.chart.labels = this.chartLabels;
      this.chart.data = this.chartData;
      this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
    }
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
