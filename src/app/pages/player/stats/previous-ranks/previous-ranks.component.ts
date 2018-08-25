import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-previous-ranks',
  templateUrl: './previous-ranks.component.html',
  styleUrls: ['./previous-ranks.component.scss']
})
export class PreviousRanksComponent implements OnInit {
  @Input() seasons: any;
  @Input() region: string;
  constructor() { }

  ngOnInit() {
  }

}
