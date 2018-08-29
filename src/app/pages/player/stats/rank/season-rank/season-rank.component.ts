import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {RankMap} from '../rank.component';

@Component({
  selector: 'app-season-rank',
  templateUrl: './season-rank.component.html',
  styleUrls: ['./season-rank.component.scss']
})
export class SeasonRankComponent implements OnInit, OnChanges {
  @Input() rank: any;
  @Input() season: string;
  @Input() region: string;
  @Input() max = false;
  currentRank: number;
  currentMMR: number;
  maxRank: number;
  maxMMR: number;
  rankMap = RankMap;
  constructor() { }

  ngOnInit() {
    this.bindRank();
  }

  ngOnChanges() {
    this.bindRank();
  }

  bindRank() {
    if (this.rank) {
      console.log('rank', this.rank);
      this.currentRank = this.rank ? this.rank[this.region].rank : 0;
      this.currentMMR = this.rank ? this.rank[this.region].mmr : 0;
      this.maxRank = this.rank ? this.rank[this.region].max_rank : 0;
      this.maxMMR = this.rank ? this.rank[this.region].max_mmr : 0;
    }
  }

}
