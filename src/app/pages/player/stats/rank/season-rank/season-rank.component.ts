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
  nextPrevious = {next: {mmr: 0, rank: 0}, previous: {mmr: 0, rank: 0}};
  mmrScale = [
    0,
    1499,
    1599,
    1699,
    1799,
    1899,
    1999,
    2099,
    2199,
    2299,
    2399,
    2499,
    2699,
    2899,
    3099,
    3299,
    3699,
    4099,
    4499,
    20000
  ];

  constructor() {
  }

  ngOnInit() {
    this.bindRank();
  }

  ngOnChanges() {
    this.bindRank();
  }

  bindRank() {
    if (this.rank) {
      this.currentRank = this.rank ? this.rank[this.region].rank : 0;
      this.currentMMR = this.rank ? this.rank[this.region].mmr : 0;
      this.maxRank = this.rank ? this.rank[this.region].max_rank : 0;
      this.maxMMR = this.rank ? this.rank[this.region].max_mmr : 0;
      if (!this.max) {
        this.nextPrevious = this.nextPreviousCalc();
      }
    }
  }

  nextPreviousCalc(): any {
    let previous = -1000;
    for (const upperBounds of this.mmrScale) {
      if (this.between(this.currentMMR, previous, upperBounds)) {
        const isNotMax = this.currentRank < 20;
        const isNotMin = this.currentRank !== 0;
        const np = {
          next: {
            mmr: isNotMax ? upperBounds - this.currentMMR : 0,
            rank: isNotMax ? this.currentRank + 1 : this.currentRank
          },
          previous: {
            mmr: isNotMin ? this.currentMMR - previous : 0,
            rank: isNotMin ? this.currentRank - 1 : this.currentRank
          }
        };
        return np;
      }
      previous = upperBounds;
    }
  }

  between(x, min, max): boolean {
    return x >= min && x <= max;
  }

}
