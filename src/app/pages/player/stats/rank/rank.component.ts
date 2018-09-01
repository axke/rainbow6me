import {Component, Input, OnInit} from '@angular/core';

export enum RankMap {
  'Unranked',
  'Copper IV',
  'Copper III',
  'Copper II',
  'Copper I',
  'Bronze IV',
  'Bronze III',
  'Bronze II',
  'Bronze I',
  'Silver IV',
  'Silver III',
  'Silver II',
  'Silver I',
  'Gold IV',
  'Gold III',
  'Gold II',
  'Gold I',
  'Platinum III',
  'Platinum II',
  'Platinum I',
  'Diamond'
}


@Component({
  selector: 'app-player-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {
  @Input() rank: any;
  @Input() region: any;
  constructor() { }

  ngOnInit() {
  }

}
