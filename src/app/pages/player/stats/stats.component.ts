import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() player: any;
  @Input() seasons: any;

  constructor() {
  }

  ngOnInit() {
    console.log('player', this.player);
  }

}
